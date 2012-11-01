var Query = require('./query')
  , natural = require('natural')
  , stem = natural.PorterStemmer.stem;

function Keywords(raw) {
  this.raw = raw;
  this.data = this.parse(raw);
}
module.exports = Keywords;

Keywords.prototype.parse = function (raw) {
  var input;
  var output = [];
  var tokenizer = new natural.WordTokenizer();
    
  if(Array.isArray(raw)) {
    input = raw;
  } else {
    input = [raw];
  }

  input.forEach((function (line, l) {
    output = output.concat(this.tokenize(line, l));
  }).bind(this));
  
  return output;
}

Keywords.prototype.tokenize = function (line, l) {
  var tokens = tokenizer.tokenize(line);
  var output = [];
  for(var i = 0; i < tokens.length; i++) {
    var word = tokens[i];
    if(word && word.length > 2) {
      output.push({value: stem(word.toLowerCase()), line: l});
    }
  }
  return output;
}

Keywords.prototype.match = function (input) {
  var inputKeys;
  var thisKeys = this;
  
  if(input instanceof Keywords) {
    inputKeys = input;
  } else {
    inputKeys = new Keywords(input);
  }
  
  var results = {hits: 0, length: thisKeys.data.length, lines: []};
  
  inputKeys.data.forEach(function (k) {
    thisKeys.data.forEach(function (tk) {
      if(k.value === tk.value) {
        results.hits++;
        results.lines.push(tk.line);
      }
    });
  });
  
  return results;
}

Keywords.parseSections = function (sections) {
  Query.walkSections(sections, function (sec) {
    sec.keywords = new Keywords(sec.lines);
  });
}