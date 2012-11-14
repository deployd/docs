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

function hash(str) {
  var result = 0;
  
  if(str) {
    for (var i=0; i < str.length; i++) {
      result += str.charCodeAt(i);
    };
  }
  
  return result;
}

Section.prototype.anchor = function () {
  if(!this.phash && this.parent) {
    this.phash = hash(this.parent.title);
  }
  
  return 's-' + this.title + (this.phash ? ('-' + this.phash) : '') 
    .replace(/,/g, '')
    .replace(/[\(\)]/g, ' ')
    .trim()
    .replace(/ +/g, '-');
};

Section.prototype.html = function () {
  var html = '<div class="section'+ (this.reference ? ' reference' : '') + (this.api ? ' api' : '') +'">';
  html += '<a name="' + this.anchor() + '"></a>';
  var markdownSource = this.lines.join('\n');
  markdownSource = this.addAnchorLink(markdownSource);

  html += md(markdownSource);
  
  var children = this.children;
  if(children && children.length) {
    children.forEach(function (c) {
      html += c.html();
    });
  }
  
  html += '</div>';
  
  return html;
};

Section.prototype.addAnchorLink = function(markdownSource) {
  var regex = /^(#+)\s*(.+)$/m;
  var match = markdownSource.match(regex);

  if (match) {
    var level = match[1].length
      , heading = match[2]
      , anchor = this.anchor()
      , replacement = '<h' + level + '>' + heading + ' <a class="anchor-link" href="#' + anchor + '">#</a></h' + level + '>';

      return markdownSource.replace(match[0], replacement);
  }

  // return markdownSource;
  return "# NOPE";
};

Section.prototype.exampleHtml = function () {
  var markdown = '';
  var open = false;
  
  if(this.api && this.lines) {
    for(var i = 0; i < this.lines.length; i++) {
      var line = this.lines[i];
      if(line.replace(' ', '').length && line[0] === ' ') {
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