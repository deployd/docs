# stem-porter

Reduce words to their stems.

This package is a JavaScript implementation of the
[Porter2 Stemming Algorithm](http://snowball.tartarus.org/algorithms/english/stemmer.html).

# Usage

    var stem = require('stem-porter')

    stem("meetings")
    // => "meet"

    stem("dwellings")
    // => "dwell"

    stem("favourable")
    // => "favour"

Remember that the stems are not guaranteed to be valid words.

# Install

    $ npm install stem-porter

# More info

For more information on Porter's algorithm and stemming in general, see:

  * [Porter's original stemmer algorithm paper](http://tartarus.org/~martin/PorterStemmer/def.txt)
  * [Snowball](http://snowball.tartarus.org/), a string manipulation language
  * [Wikipedia/Stemming](http://en.wikipedia.org/wiki/Stemming)

Currently only English is supported. The implementation is heavily inspired by
the [Snowball implementation](http://snowball.tartarus.org/algorithms/english/stemmer.html)
of Porter's English stemmer.

# License

MIT

