var test = require('tap').test
  , fs = require('fs')
  , stem = require(__dirname + '/..')


test("step 1", test_stems(
  { caresses: "caress"
  , ponies: "poni"
  , sties: "sti"
  , tie: "tie"
  , caress: "caress"
  , cats: "cat"
  , feed: "feed"
  , matting: "mat"
  , milling: "mill"
  , messing: "mess"
  , meetings: "meet"
  }))

function test_stems(wordmap) {
  return function(t) {
    var word
    for (word in wordmap) {
      t.equals(stem(word), wordmap[word], "Stem of '" + word + "'")
    }
    t.end()
  }
}


// 1365 -> 580 -> 349 -> 343 -> 314 -> 250 -> 154 -> 41 -> 4
// 2490
// 1135
// 1207 - w/o
test("all the things", function(t) {
  var data = fs.readFileSync(__dirname + "/diffs.txt")
    , lines = data.toString().split("\n")
    , diff, w

  lines.forEach(function(line) {
    if (!line) return
    diff = line.split(/\s+/)
    w = stem(diff[0])
    //if (w[w.length - 1] !== "e") {
      t.equals(w, diff[1], "Stem of '" + diff[0] + "'")
    //}
  })

  t.end()
})
