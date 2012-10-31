
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('./middleware/templates')(path.join(__dirname, 'views')));
  require('./routes');
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var Index = require('./lib/indexer');
var index = app.index = new Index();
index.crawl('docs', function (cache) {
  app.docs = cache;
});