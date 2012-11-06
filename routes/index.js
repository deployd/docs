var md = require('node-markdown').Markdown
  , path = require('path')
  , Query = require('../lib/query');

app.get('/search', function (req, res) {
  var query = new Query(req.param('q'), app.index.root(), app.docs);
  
  var results = query.search();
  
  res.render('results.ejs', results);
});

app.get('/', function (req, res) {
  var root = app.index.root();
  var refs = [];
  
  root.children().forEach(function (c) {
    if(c.dir) {
      c.children().forEach(function (cc) {
        var bn = cc.basename();
        if(cc.dir && bn === 'reference' || bn === 'internal-api') {
          refs.push(cc);
        }
      });
    }
  });
  
  res.render('index.ejs', {rootInfo: root, refs: refs});
});

app.get(/^\/docs\/(.+)$/, function (req, res) {
  var p = req.params[0]
    , info = app.docs['docs/' + p]
    , refs = []
    , mainParent = info.mainParent();
  
  app.index.root().children().forEach(function (c) {
    if(c == mainParent) {
      c.children().forEach(function (cc) {
        var bn = cc.basename();
        if(cc.dir && bn === 'reference' || bn === 'internal-api') {
          refs.push(cc);
        }
      });
    }
  });  
      
  res.render('browser.ejs', {refs: refs, info: info, include: req.param('include'), current: req.url});
});

app.get('/docs', function (req, res) {
  res.redirect('/');
});

app.get('/complete/:input', function (req, res) {
  var input = req.param('input');
  var terms = [];
  
  var query = new Query(input, app.index.root(), app.docs);
  
  res.send(query.phrases());
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