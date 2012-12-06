/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , cluster = require('cluster');

app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(require('./middleware/templates')(path.join(__dirname, 'views')));
  app.use(express.static(path.join(__dirname, 'public')));
  require('./routes');
  app.use(app.router);
  app.use(function(req, res, next){
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
      console.error('404 - ', req.url, req.headers.referer);
      res.render('404.ejs', { url: req.url });
      return; 
    }

    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
  });

  // error-handling middleware, take the same form
  // as regular middleware, however they require an
  // arity of 4, aka the signature (err, req, res, next).
  // when connect has an error, it will invoke ONLY error-handling
  // middleware.

  // If we were to next() here any remaining non-error-handling
  // middleware would then be executed, or if we next(err) to
  // continue passing the error, only error-handling middleware
  // would remain being executed, however here
  // we simply respond with an error page.

  app.use(function(err, req, res, next) {
    // we may use properties of the error object
    // here and next(err) appropriately, or if
    // we possibly recovered from the error, simply next().
    res.status(err.status || 500);
    res.render('500.ejs', { error: err });
  });
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


/**
 * nodefly 
 */
 
if(process.env.NODEFLY_ID) {
  require('nodefly').profile(
    process.env.NODEFLY_ID,
    ['docs', 'docs.deployd.com', cluster.worker.id]
  );
}