var fs = require('fs')
  , stem = require(__dirname + '/..')

var lines = fs.readFileSync(__dirname + "/diffs.txt").toString().split("\n")
  , times = 15
  , start = Date.now()


for (var t = 0; t < times; t++) {
  for (var i = 0; i < lines.length; i++) {
    stem(lines[i].split(/\s+/)[0])
  }
}

console.log("" + (lines.length * times) + " words stemmed per " + (Date.now() - start) + "ms")

