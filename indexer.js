var fs = require('fs')
  , EventEmitter = require('events').EventEmitter
  , findit = require('findit')
  , util = require('util')
  , path = require('path')
  , natural = require('natural')
  , stem = natural.PorterStemmer.stem;

/**
 * Builds an in memory index of all doc content...
 */
 
function Index() {
  this.cache = {};
  this.pending = 0;
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
      index.parse(info);
      if(--pending === 0) {
        index.emit('end', index.cache);
      }
    });
  });
}

Index.prototype.parse = function (info) {
  if(info.contents) {
    var re = /<!\-\-({(?:.|\n(?!-->))*})\-\->/;
    var matches = info.contents.match(re);
    var metaStr = matches && matches[1];
    if(metaStr) {
      try {
        info.meta = eval('(' + metaStr + ')');
      } catch(e) {
        console.error(e);
      }
    }
    
    var lines = info.contents.split(/\n/g);
    var keywords = info.keywords = {};
    
    for(var l = 0; l < lines.length; l++) {
      var tokenizer = new natural.WordTokenizer();
      var tokens = tokenizer.tokenize(lines[l]);
    
      for(var i = 0; i < tokens.length; i++) {
        var s = stem(tokens[i]);
        keywords[s] = keywords[s] || {lines: []};
        keywords[s].lines.push(l);
      }
    }
  }
}

Index.prototype.search = function (query) {
  var tokenizer = new natural.WordTokenizer();
  var tokens = tokenizer.tokenize(query);
  var keywords = {};
  var cache = this.cache;
  var matches = [];
  
  tokens.forEach(function (t) {
    keywords[stem(t)] = true; 
  });
  
  var totalKeywords = Object.keys(keywords).length;
  
  Object.keys(cache).forEach(function (k) {
    var info = cache[k];
    var matchingKeywords = 0;
    var match;
    
    
    if(info.keywords) {
      Object.keys(info.keywords).forEach(function (kw) {
        if(keywords[kw]) {
          matchingKeywords++;
          match = match || new Match(keywords, info);
          match.add(kw, info.keywords[kw].lines);
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
      if(m.locations) {
        Object.keys(m.locations).forEach(function (line) {
          results.push({
            line: line,
            matches: m.locations[line].length,
            file: m.info.file,
            meta: m.info.meta
          })
        })
      }
    });
  }
  
  return results.sort(function (a, b) {
    return a.matches > b.matches ? -1 : 1;
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