var md = require('node-markdown').Markdown
  , path = require('path'); 

app.get('/', function (req, res) {
  res.render('index.ejs', {content: app.content, docs: buildLinks('docs')});
});

app.get(/^\/docs\/(.+)$/, function (req, res) {
  var path = req.params[0]
    , info = app.docs['docs/' + path];
  
  res.send(md(info.contents));
});

app.get('/search', function (req, res) {
  var results = app.index.search(req.param('q'));
  
  results.forEach(function (r) {
    r.preview = getLine(r.file, Number(r.line));
  });
  
  res.send(results);
});

function buildLinks(dir) {
  var results = [];
  
  Object.keys(app.docs).forEach(function (p) {
    var info = app.docs[p];
    
    if(info.dir && path.dirname(info.dir) === dir) {
      var d = {
        path: info.dir,
        files: buildLinks(info.dir),
        title: formatTitle(info)
      };
      results.push(d);
    } else if(path.dirname(info.file) === dir) {
      results.push({
        path: info.file,
        title: formatTitle(info)
      });
    }
  });
  
  return results;
}

function formatTitle(info) {
  var meta = info.meta;
  var title = (meta && meta.title) || info.file || info.dir;
  title = path.basename(title);
  title = title.replace(path.extname(title), '');
  title = title.replace(/-/g, ' ');
  return title;
}

function getLine(file, line) {
  var info = app.docs[file];
  var contents = info && info.contents;
  
  if(contents) {
    return contents.split(/\n/g)[line];
  }
}