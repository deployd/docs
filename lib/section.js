var md = require('node-markdown').Markdown;

function Section(data, info) {
  Object.keys(data).forEach((function (k) {
    this[k] = data[k];
  }).bind(this));
  this.children = [];
  if(data.md) {
    var m = data.md.match(/#+\s+(.+)\s+<!\-\-\s*(ref|api)\s*\-\->/);
    if(m && m[1] && m[2]) {
      if(m[2] === 'ref') {
        this.reference = m[1];
        this.title = this.reference
      } else if(m[2] === 'api') {
        this.api = m[1];
        this.title = this.api
      }
    } else {
      var tm = data.md.match(/#+\s+(.+)/);
      if(tm && tm[1]) {
        this.title = tm[1];
      }
    }
  }
}
module.exports = Section;

Section.prototype.url = function (q) {
  var query = '';
  
  if(q) {
    query += '?q=' + q;
  }
  
  return this.info.url() + query + '#' + this.anchor();
}

Section.prototype.anchor = function () {
  return 's-' + this.title.replace(' ', '-');
}

Section.prototype.html = function () {
  var html = '<div class="section'+ (this.reference ? ' reference' : '') + (this.api ? ' api' : '') +'" id="'+ this.anchor() +'">';
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

Section.prototype.exampleHtml = function () {
  var markdown = '';
  var open = false;
  
  if(this.reference && this.lines) {
    for(var i = 0; i < this.lines.length; i++) {
      var line = this.lines[i];
      
      if(line.substr(0, 4) === '    ') {
        open = true;
        markdown += line + '\n';
      } else if(open && markdown) {
        break;
      }
    }
  }
  
  return markdown ? md(markdown) : '';
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
  var prevParent;
  
  lines && lines.forEach(function (l, i) {
    var d = getHeaderNum(l);
    if(d) {
      if(parent && d <= parent.depth) {
        prevParent = parent;
        parent = undefined;
      }
      if(cur && d > cur.depth) {
        parent = cur;
      }
      
      cur = new Section({info: info, line: i, lines: [], depth: d, md: l});
      
      if(parent) {
        cur.parent = parent;
        parent.children.push(cur);
      } else if(prevParent && prevParent.depth === d) {
        prevParent.children.push(cur);
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