var path = require('path')
  , md = require('node-markdown').Markdown
  , Reference = require('./Reference')
  , Section = require('./Section')
  , Keywords = require('./keywords');

function Info(data, index) {
  this.references = [];
  this.sections = [];
  this._index = index;
  this._path = data.file || data.dir;
  Object.keys(data).forEach((function (k) {
    this[k] = data[k];
  }).bind(this));
}
module.exports = Info;

Info.prototype.setContents = function (contents) {
  this.contents = contents;
  this.buildSections();
}

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

Info.prototype.children = function (excludeIndex) {
  if(!this.dir) return;
  
  var result = this._index.getFilesInDir(this.dir);
  
  if(excludeIndex) {
    var children = result;
    result = [];
    children.forEach(function (c) {
      if(c.isIndexFile()) return;
      result.push(c);
    });
  }
  
  return result;
}

Info.prototype.depth = function () {
  return this._path.split('/').length;
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
  var result = '';
  
  if(this.sections.length) {
    this.sections.forEach(function (s) {
      result += s.html();
    });
  }
  
  return result;
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

Info.prototype.addSection = function (section) {
  this.sections.push(section);
  if(section.reference) this.references.push(section);
  var parent = this.parent();
  if(parent) {
    parent.addSection(section);
  }
}

Info.prototype.buildSections = function () {
  var sections = Section.createFromInfo(this);
  Keywords.parseSections(sections);
  sections.forEach(this.addSection.bind(this));
}

Info.prototype.isIndexFile = function () {
  return this.file && this.anchor() === 'index';
}