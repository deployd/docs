var md = require('node-markdown').Markdown;

function Section(data, info) {
  Object.keys(data).forEach((function (k) {
    this[k] = data[k];
  }).bind(this));
  this.children = [];
  if(data.md) {
    var m = data.md.match(/#+\s+(.+)\s+<!\-\- ref \-\->/);
    if(m && m[1]) {
      this.reference = m[1];
      this.title = this.reference
    } else {
      var tm = data.md.match(/#+\s+(.+)/);
      if(tm && tm[1]) {
        this.title = tm[1];
      }
    }
  }
}
module.exports = Section;

Section.prototype.url = function () {
  return this.info.url() + '#' + this.anchor();
}

Section.prototype.anchor = function () {
  return 's-' + this.title;
}

Section.prototype.html = function () {
  var html = '<div class="section'+ (this.reference ? ' reference' : '') +'" id="'+ this.anchor() +'">';
  html += '<a name="' + this.anchor() + '"></a>'

  html += md(this.lines.join('\n'));
  
  var children = this.children;
  if(children && children.length) {
    children.forEach(function (c) {
      html += c.html();
    });
  }
  
  html += '</div>';
  
  return html;
}

function getHeaderNum(line) {
  var m = line.match(/^#+/);
  if(!m) return 0;
  return m[0].length;
}

function getLargestHeader(lines, depth) {
  if(!lines) return;
  var re = /#+/;
  var min = depth;
  lines.forEach(function (l) {
    var hn = getHeaderNum(l);
    if(!hn) return;
    if(min) {
      if(hn < min) min = hn;
    } else {
      min = hn;
    }
  });
  
  return min;
}

function buildSections (lines, info) {
  var sections = [];
  var cur;
  var parent;
  
  lines && lines.forEach(function (l, i) {
    var d = getHeaderNum(l);
    if(d) {
      if(parent && d <= parent.depth) {
        parent = undefined;
      }
      if(cur && d > cur.depth) {
        parent = cur;
      }
      
      cur = new Section({info: info, line: i, lines: [], depth: d, md: l});
      
      if(parent) {
        parent.children.push(cur);
      } else {
        sections.push(cur);
      }
    }
    if(cur) cur.lines.push(l);
  });
  
  return sections;
}

Section.createFromInfo = function (info) {
  if(!info.contents) return;
  
  return buildSections(info.getLines(), info);
}