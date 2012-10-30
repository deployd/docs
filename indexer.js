var fs = require('fs')
  , EventEmitter = require('events').EventEmitter
  , findit = require('findit')
  , util = require('util')
  , path = require('path')
  , natural = require('natural')
  , stem = natural.PorterStemmer.stem;

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
  if(this.ignore(file)) return;
  this.cache[file] = {stat: stat, file: file};
}

Index.prototype.indexDir = function (dir, stat) {
  if(this.ignore(dir)) return;
  this.cache[dir] = {stat: stat, dir: dir};
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
    if(metaStr) {
      try {
        info.meta = eval('(' + metaStr + ')');
      } catch(e) {
        console.error(e);
      }
    }
    contents = contents.replace(re, '');
    info.contents = contents;
    var lines = contents.split(/\n/g);
    var keywords = info.keywords = {};
    
    for(var l = 0; l < lines.length; l++) {
      var tokenizer = new natural.WordTokenizer();
      // replace contents of [links](http://foo) with just content.
      var line = lines[l].replace(/\[(.+)\]\(.+\)/g, '$1');
      if(line[0] === '#') {
        this.addSection(line, info);
      }
      
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

Index.prototype.addSection = function (line, info) {
  line = line.toLowerCase();
  line = line.replace(/#+\s+/, '');
  this.sections[line] = this.sections[line] || {};
  this.sections[line].file = info.file;
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