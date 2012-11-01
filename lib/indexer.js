var fs = require('fs')
  , EventEmitter = require('events').EventEmitter
  , findit = require('findit')
  , util = require('util')
  , path = require('path')
  , natural = require('natural')
  , stem = natural.PorterStemmer.stem
  , Info = require('./info');

// The developers of findit refuse to support windows; walkdir is an API-compatible replacement
if (process.platform === 'win32') {
  findit = require('walkdir');
} 

/**
 * Builds an in memory index of all doc content...
 */
 
function Index() {
  this.cache = {};
  this.pending = 0;
  this.terms = {};
  this.sections = {};
  
  this.cache['docs'] = new Info({dir: 'docs'}, this);
  
  this.on('end', function () {
    // clean terms
    var terms = this.terms;
    Object.keys(terms).forEach(function (t) {
      if(terms[t] < 2) {
        delete terms[t];
      }
    });
  });
}
util.inherits(Index, EventEmitter);
module.exports = Index;

Index.prototype.indexFile = function (file, stat) {
  file = path.relative('.', file).replace(/\\/g, '/');
  if(this.ignore(file)) return;
  this.cache[file] = new Info({stat: stat, file: file}, this);
}

Index.prototype.indexDir = function (dir, stat) {
  dir = path.relative('.', dir).replace(/\\/g, '/');
  if(this.ignore(dir)) return;
  this.cache[dir] = new Info({stat: stat, dir: dir}, this);
}

Index.prototype.ignore = function (p) {
  p = path.basename(p);
  if(p && p[0] === '.') return true;
  return false;
}

Index.prototype.crawl = function (dir, fn) {
  var f = this.finder = findit(dir);
  f.on('directory', this.indexDir.bind(this));
  f.on('file', this.indexFile.bind(this));
  f.on('end', this.build.bind(this));
  this.on('end', fn);
}

Index.prototype.build = function () {
  var index = this
    , cache = index.cache
    , files = [];
  
  Object.keys(cache).forEach(function (k) {
    if(cache.hasOwnProperty(k)) {
      var info = cache[k];
      if(info.file) {
        files.push(info);
      }
    }
  });
  
  var pending = files.length;
  files.forEach(function (info) {
    fs.readFile(info.file, function (err, contents) {
      info.contents = contents.toString();
      try {
        index.parse(info);
      } catch(e) {
        console.error('could not parse', info.file, e);
      }
      if(--pending === 0) {
        index.emit('end', index.cache);
      }
    });
  });
}

Index.prototype.parse = function (info) {
  if(info.contents) {
    var contents = info.contents;
    var re = /<!\-\-({(?:.|\n(?!-->))*})\-\->/;
    var matches = contents.match(re);
    var metaStr = matches && matches[1];
    if(info.file.match(/\.json$/)) {
      try {
        info.json = JSON.parse(info.contents);
      } catch(e) {
        console.error('error parsing ', info.file, e);
      }
      
      var dir = info.file.replace(path.basename(info.file), '')
      if(Array.isArray(info.json)) {
        for(var i = 0; i < info.json.length; i++) {
          info.json[i] = dir + info.json[i];
        }
      }
    }
    
    if(metaStr) {
      try {
        info.meta = eval('(' + metaStr + ')');
      } catch(e) {
        console.error(e);
      }
    }
    contents = contents.replace(re, '');
    info.setContents(contents);
    var lines = contents.split(/\n/g);
    var keywords = info.keywords = {};
    
    for(var l = 0; l < lines.length; l++) {
      var tokenizer = new natural.WordTokenizer();
      // replace contents of [links](http://foo) with just content.
      var line = lines[l].replace(/\[(.+)\]\(.+\)/g, '$1');    
      var tokens = tokenizer.tokenize(line);
      for(var i = 0; i < tokens.length; i++) {
        this.addTerm(tokens, i);
        var s = stem(tokens[i]);
        if(s) s = s.toLowerCase();
        keywords[s] = keywords[s] || {lines: []};
        if(keywords[s].lines) {
          keywords[s].lines.push(l); 
        }
      }
    }
  }
}

Index.prototype.addTerm = function (tokens, i) {
  var terms = this.terms;
  var term = tokens[i];
  
  function add(t) {
    t = t.toLowerCase();
    terms[t] = terms[t] || 0;
    terms[t]++;
  }
  
  function next(n) {
    var p = [];
    for(var j = i; j < tokens.length && j < i + n; j++) {
      p.push(tokens[j]);
    }
    
    return p.join(' ');
  }
  
  var phrase = next(2);
  var longPhrase = next(3);
  add(term);
  add(phrase);
  add(longPhrase);
}

Index.prototype.search = function (query) {
  query = query.toLowerCase();
  var tokenizer = new natural.WordTokenizer();
  var tokens = tokenizer.tokenize(query);
  var keywords = {};
  var cache = this.cache;
  var matches = [];
  
  tokens.forEach(function (t) {
    var s = stem(t);
    if(s) s = s.toLowerCase();
    keywords[s] = true; 
  });
  
  var totalKeywords = Object.keys(keywords).length;
  
  Object.keys(cache).forEach(function (k) {
    var info = cache[k];
    var matchingKeywords = 0;
    var match;
    var tags = info.meta && info.meta.tags;
    
    if(info.keywords) {
      Object.keys(info.keywords).forEach(function (kw) {
        // match on keywords
        if(keywords[kw]) {
          matchingKeywords++;
          match = match || new Match(keywords, info);
          if(info.keywords[kw] && info.keywords[kw].lines) {
            match.add(kw, info.keywords[kw].lines);
          }
        }
      
        // match on tags
        if(tags) {
          tags.indexOf(keywords[kw] > -1);
          match = match || new Match(keywords, info);
        }
      });
      
      if(match) {
        matches.push(match);
      }
    }
  });
  
  var results = [];
  
  if(matches && matches.length) {
    matches.forEach(function (m) {
      results.push(m.toResult());
    });
  }
  
  return results.sort(function (a, b) {
    return a.score > b.score ? -1 : 1;
  });
}

Index.prototype.getFilesInDir = function (dir) {
  var files = [];
  Object.keys(this.cache).forEach((function (p) {
    if(path.dirname(p) === dir) {
      files.push(this.cache[p]);
    }
  }).bind(this));
  return files;
}

Index.prototype.root = function () {
  return this.cache['docs'];
}

function Match(query, info) {
  this.query = query;
  this.info = info;
  this.locations = {};
}

Match.prototype.add = function (keyword, lines) {
  var locations = this.locations;
  
  lines.forEach(function (l) {
    locations[l] = locations[l] || [];
    locations[l].push(keyword);
  });
}

Match.prototype.score = function () {
  var tags = this.info.tags;
  var tagScore = 0;
  
  if(tags && tags.length) {
    tags.forEach(function (t) {
      if(this.query[stem(t)]) tagScore++;
    });
  }
  
  var lineScore = Object.keys(this.locations).length;

  return (tagScore * 10) + lineScore;
}

Match.prototype.toResult = function () {
  var m = this;
  var max = Object.keys(m.query).length;
  
  Object.keys(m.locations).forEach(function (l) {
    var found = 0;
    var kws = m.locations[l];
    
    
    Object.keys(m.query).forEach(function (kw) {
      if(kws.indexOf(kw) > -1) found++;
    });
    
    
    if((found / max) <= 0.5) delete m.locations[l];
  });
  
  return {
    file: m.info.file,
    meta: m.info.meta,
    locations: m.locations,
    score: this.score()
  }
}