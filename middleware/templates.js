var ejs = require('ejs')
  , fs = require('fs')
  , path = require('path');

module.exports = function (views) {
  return function (req, res, next) {
    req.layout = 'layouts/global.ejs';
    req.locals = {url: req.url};
    res.render = function (view, data) {
      
      read(view, function (err, contents) {
        if(err) return next(err);
        
        var body = render(contents, data);
        read(req.layout, function (err, contents) {
          if(err) return next(err);
          var data = {body: body};
          Object.keys(req.locals).forEach(function (k) {
            data[k] = req.locals[k];
          });
          
          res.send(render(contents, data));
        });
      });
    }
    
    next();
  }
  
  function read(view, fn) {
    fs.readFile(path.join(views, view), function (err, data) {
      if(err) return fn(err);
      fn(null, data.toString());
    });
  }

  function partial(view, data) {
    var tmpl = fs.readFileSync(path.join(views, 'partials', view + '.ejs'));
    if(tmpl) tmpl = tmpl.toString();
    return render(tmpl, data);
  }

  function render(template, data) {
    data = data || {};
    var content;
    
    try {
      content = ejs.render(template, {body: data.body || '', data: data || {}, partial: partial, script: script});
    } catch(e) {
      console.error(e);
    }
    
    return content;
  }
  
  function script(f) {
    src = '<script src="' + '/javascripts' + '/' + f + '.js' + '"></script>';
    return render(src);
  }
}

