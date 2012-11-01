var Keywords;
var md = require('node-markdown').Markdown;

process.nextTick(function () {
  Keywords = require('./keywords');
});

function Query(terms, root, docs) {
  this.terms = terms;
  this.root = root;
  this.docs = docs;
}
module.exports = Query;

Query.prototype.phrases = function () {
  var sections = this.root.sections;
  var q = this.terms.toLowerCase();
  var MAX_MATCHES = 6;
  var matches = [];
  
  this.walkSections(function (sec) {
    if(~lower(sec.title).indexOf(q)) {
      var m;
      if(sec.reference) {
        m = {
          reference: sec.reference,
          url: sec.url()
        };
      } else {
        m = {title: sec.title, url: sec.url()}
      }
      if(matches.length < MAX_MATCHES) {
        matches.push(m);
      } else {
        return false;
      }
    }
  });
  
  return matches;
}

Query.prototype.walkSections = function (info, fn) {
  if(typeof info === 'function') {
    fn = info;
    info = undefined;
  }
  
  if(!info) info = this.root;
  
  Query.walkSections(info.sections, fn);
}

Query.walkSections = function (sections, fn) {
  function walk(sec) {
    fn(sec);
    if(Array.isArray(sec.children)) {
      sec.children.forEach(walk);
    }
  }
  
  sections.forEach(walk);
}

Query.prototype.search = function () {
  var results = [];
  var q = this.terms;
  
  this.walkSections(function (sec) {
    if(sec.reference) {
      var score = 0;
      
      if(~sec.title.toLowerCase().indexOf(q.toLowerCase())) {
        score = 10;
      }
      
      var qKeys = new Keywords(q);
      var titleMatch = qKeys.match(sec.title);
      // 10x pts for title matches
      score += 10 * titleMatch.hits;
      var contentMatch = sec.keywords.match(q);
      // 2x pts for content matches
      score += 2 * contentMatch.hits;
      // pts * depth
      score *= sec.depth;
      
      if(score) {
        results.push({score: score, section: sec});
      }
    } else {
      var score = 0;
      var qKeys = new Keywords(q);
      var titleMatch = qKeys.match(sec.title);
      // 10x pts for title matches
      score += 10 * titleMatch.hits;
      var contentMatch = sec.keywords.match(q);
      score += contentMatch.hits;
      // 3x for depth
      score *= sec.depth;
      
      if(score) {
        var result = {score: score, section: sec, preview: ''};
        // build preview
        if(contentMatch.hits) {
          contentMatch.lines.forEach(function (l) {
            var line = sec.lines[l];
            if(line && line[0] !== ' ' && line[0] !== '#') {
              result.preview = md(line + '\n');
              return false;
            }
          });
        }
        results.push(result);
      }
    }
  });
  
  return {
    q: q,
    results: results.sort(scoreSorter)
  };
}

function scoreSorter(a, b) {
  a = a.score;
  b = b.score;
  
  if(a === b) return 0;
  return a > b ? -1 : 1;
}

function lower(s) {
  return s.toLowerCase();
}