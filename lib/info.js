var path = require('path')
  , md = require('node-markdown').Markdown;

function Info(data, index) {
  this._index = index;
  this._path = data.file || data.dir;
  Object.keys(data).forEach((function (k) {
    this[k] = data[k];
  }).bind(this));
}
module.exports = Info;

Info.prototype.siblings = function () {
  var ls = this._index.getFilesInDir(path.dirname(this._path))
    , results = [];
  
  ls.forEach((function (f) {
    if(f !== this) {
      results.push(f);
    }
  }).bind(this));
  
  return results;
}

Info.prototype.title = function () {
  var meta = this.meta;
  var title = (meta && meta.title) || this._path;
  title = path.basename(title);
  title = title.replace(path.extname(title), '');
  title = title.replace(/-/g, ' ');
  return title;
}

Info.prototype.parent = function () {
  return this._index.cache[path.dirname(this._path)];
}

Info.prototype.children = function (recursive) {
  if(!this.dir) return;
  
  return this._index.getFilesInDir(this.dir);
}

Info.prototype.depth = function () {
  return this._path.split('/').length;
}

Info.prototype.sections = function () {
  var lines = this.getLines();
  
  if(lines) {
    lines.forEach(function () {
      
    });
  }
}

Info.prototype.sectionTitleAtLine = function (n) {
  var lines = this.getLines(contents);
  if(lines) {
    var i = n;
    while(i--) {
      var line = lines[i];
      if(line && line.indexOf('#') === 0) return line;
    }
  }
  return false;
}

Info.prototype.getLines = function () {
  var contents = this.contents;
  
  if(contents) {
    return contents.split(/\n/g);
  }
}

Info.prototype.basename = function () {
  return path.basename(this._path);
}

Info.prototype.dirname = function () {
  return path.dirname(this._path);
}

Info.prototype.extname = function () {
  return path.extname(this._path);
}

Info.prototype.url = function (relative) {
  return '/' + this._path;
}

Info.prototype.isCurrent = function (url) {
  return this.url() === url;
}

Info.prototype.public = function () {
  return this.extname()!== '.json';
}

Info.prototype.anchor = function () {
  if(this.file) {
    return this.basename().replace(this.extname(), '');
  }
}

Info.prototype.html = function () {
  return this.contents ? md(this.contents) : '';
}

Info.prototype.index = function () {
  var children = this.children()
    , index;
  
  if(this.dir && children) {
    children.forEach(function (c) {
      if(c.anchor() === 'index' && c.extname() === '.md') {
        index = c;
      }
    });
  }
  
  return index;
}