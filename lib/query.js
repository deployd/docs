function Query(terms, root, docs) {
  this.terms = terms;
  this.root = root;
  this.docs = docs;
}
module.exports = Query;

Query.prototype.phrases = function () {
  var sections = this.root.sections;
  var q = this.terms.toLowerCase();
  var matches = [];
  var result = [];
  
  function matchTitle(sec) {
    if(~lower(sec.title).indexOf(q)) {
      var m;
      if(sec.reference) {
        m = {reference: sec.reference};
      } else {
        m = {title: sec.title}
      }
      matches.push(m);
    }
    
    if(Array.isArray(sec.children)) sec.children.forEach(matchTitle);
  }
  
  sections.forEach(matchTitle);
  
  return matches;
}

function lower(s) {
  return s.toLowerCase();
}