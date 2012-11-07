var path = require('path')
  , md = require('node-markdown').Markdown
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
  
  if(contents && this.file && this.basename() === 'index.json') {
    var index;
    
    try {
      index = JSON.parse(contents);
    } catch(e) {
      console.error('error parsing ', this.file, e);
    }
    
    var children = index && index.children;
    var aliases = (index && index.aliases) || {};
    
    if(children) {
      var i = children.length;
      this.siblings().forEach(function (s) {
        
        s.order = children.indexOf(s.basename());
        
        if(s.order === -1) s.order = i++;
        
        var alias = aliases[s.basename()];
        if(alias) {
          var meta = s.meta || (s.meta = {});
          meta.title = alias;
        }
      });
    }
  }
}

Info.prototype.siblings = function () {
  var ls = this._index.getFilesInDir(path.dirname(this._path))
    , results = [];
  
  ls.forEach((function (f) {
    if(f !== this) {
      results.push(f);
    }
  }).bind(this));
  
  return results.sort(sort);
}

Info.prototype.title = function () {
  var meta = this.meta;
  var title = (meta && meta.title);
  
  if(title) return title;
  
  var result = [];
  this.basename().replace(this.extname(), '').split(/-/).forEach(function (w) {
    
    result.push(w.charAt(0).toUpperCase() + w.slice(1));
  });
  
  return result.join(' ');
}

Info.prototype.parent = function () {
  return this._index.cache[path.dirname(this._path)];
}

Info.prototype.mainParent = function () {
  var p = this, result;
  
  while(p = p.parent()) {
    if(p === app.index.root()) break;
    result = p;
  }
  
  return result || this;
}

function sort(a, b) {
  if(a.order === -1) return -1;
  return a.order > b.order ? 1 : -1;
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
  
  return result.sort(sort);
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

function sectionSort(a, b) {
  if(a.info.order === -1) return -1;
  return a.info.order > b.info.order ? 1 : -1;
}

Info.prototype.html = function () {
  var result = '';
  
  if(this.file) {
    if(this.sections.length) {
      this.sections.sort(sectionSort).forEach(function (s) {
        result += s.html();
      });
    }
  } else if(this.dir) {
    this.children().forEach(function (c) {
      result += c.html();
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

Info.prototype.isActive = function (currentUrl) {
  return currentUrl && currentUrl.replace('/', '') === this._path;
}