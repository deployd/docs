var md = require('node-markdown').Markdown
  , path = require('path')
  , Query = require('../lib/query');

app.get('/search', function (req, res) {
  var q = req.param('q');
  var results = app.index.search(q);
  
  results.forEach(function (r) {
    var previews = r.previews = [];
    
    Object.keys(r.locations).forEach(function (l) {
      var lineNum = Number(l);
      var p = {
        html: formatPreview(q, getLine(r.file, lineNum)),
        matches: r.locations[l].length || 0,
        section: getSecion(r.file, lineNum)
      };
      if(p.html) previews.push(p); 
      
    });
    
    delete r.locations;
    previews.sort(function (a, b) {
      return a.matches > b.matches ? -1 : 1
    });
    
    // merge previews by section
    r.previews = [];
    var sections = {};
    var order = 0;
    previews.forEach(function (p) {
      if(!p.section) return;
      var s = p.section;
      s = s.replace(/#+\s+/, '');
      if(p.html.indexOf(s) > -1) return;
      
      sections[s] = sections[s] || [];
      sections[s].push(p);
      sections[s].order = order++;
    });
    
    Object.keys(sections).forEach(function (s) {
      r.previews.push({
        title: s,
        matches: sections[s]
      });
    });
  });
  
  res.send(results);
});

app.get('/', function (req, res) {
  var root = app.index.root();
  
  res.render('index.ejs', {rootInfo: root});
});

app.get(/^\/docs\/(.+)$/, function (req, res) {
  var p = req.params[0]
    , info = app.docs['docs/' + p];
  res.render('browser.ejs', {info: info, include: req.param('include')});
});

app.get('/docs', function (req, res) {
  res.redirect('/');
});

app.get('/terms', function (req, res) {
  var query = new Query(req.param('q'), app.index.root(), app.docs);
  
  res.send(query.phrases());
});

app.get('/complete/:input', function (req, res) {
  var input = req.param('input');
  var terms = [];
  
  Object.keys(app.index.terms).forEach(function (term) {
    if(term && term.indexOf(input) === 0 && term.length > input.length) {
      terms.push({
        value: term,
        rank: app.index.terms[term]
      });
    }
  });
  
  Object.keys(app.index.sections).forEach(function (section) {
    if(section && section.indexOf(input) === 0 && section.length > input.length) {
      terms.push({
        value: section,
        rank: 20,
        url: '/' + app.index.sections[section].file + '?section=' + section
      });
    }
  });
  
  res.send(terms.sort(function (a, b) {
    return a.rank > b.rank ? -1 : 1;
  }).slice(0,4));
});

function formatPreview(query, str) {
  if(str[0] === '#') return;
  
  var words = query.split(/\s/);
  str = md(str);
  
  words.forEach(function (w) {
    var r = '(' + w + ')';
    str = str.replace(RegExp(r, 'gi'), '<strong class="kw-match">$1</strong>');
  });
  
  return str;
}