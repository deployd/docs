var ejs = require('ejs')
  , fs = require('fs')
  , path = require('path');

module.exports = function (views) {
  return function (req, res, next) {
    req.layout = 'layouts/global.ejs';
    res.render = function (view, data) {
      
      read(view, function (err, contents) {
        if(err) return next(err);
        
        var body = render(contents, data);
        read(req.layout, function (err, contents) {
          if(err) return next(err);
          res.send(render(contents, {body: body}));
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
    var tmpl = fs.readFileSync(path.join(views, view));
    return render(tmpl, data);
  }

  function render(template, data) {
    return ejs.render(template, {body: data.body || '', data: data || {}, partial: partial});
  }
}

