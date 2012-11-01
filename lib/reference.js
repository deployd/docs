var path = require('path')
  , md = require('node-markdown').Markdown;
  
function Reference(data) {
  Object.keys(data).forEach((function (k) {
    this[k] = data[k];
  }).bind(this));
}
module.exports = Reference;

Reference.prototype.url = function () {
  return this.info.url() + '#' + this.value;
}