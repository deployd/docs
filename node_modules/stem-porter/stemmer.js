var stemmer = {}
  , cache = {}

module.exports = stemmer

stemmer.except = function(word, exceptions) {
  if (exceptions instanceof Array) {
    if (~exceptions.indexOf(word)) return word
  } else {
    for (var k in exceptions) {
      if (k === word) return exceptions[k]
    }
  }
  return false
}


// word - String
// offset - Integer (optional)
// replace - Key/Value Array of pattern, string, and function.
stemmer.among = function among(word, offset, replace) {
  if (replace == null) return among(word, 0, offset)

  // Store the intial value of the word.
  var initial = word.slice()
    , pattern, replacement

  for (var i = 0; i < replace.length; i+=2) {
    pattern = replace[i]
    pattern = cache[pattern] || (cache[pattern] = new RegExp(replace[i] + "$"))
    replacement = replace[i + 1]

    if (typeof replacement === "function") {
      word = word.replace(pattern, function(m) {
        var off = arguments["" + (arguments.length - 2)]
        if (off >= offset) {
          return replacement.apply(null, arguments)
        } else {
          return m + " "
        }
      })
    } else {
      word = word.replace(pattern, function(m) {
        var off = arguments["" + (arguments.length - 2)]
        return (off >= offset) ? replacement : m + " "
      })
    }

    if (word !== initial) break
  }

  return word.replace(/ /g, "")
}
