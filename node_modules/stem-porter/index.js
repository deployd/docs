var stemmer = require('./stemmer')

exports = module.exports = require('./langs/english')

exports.among = stemmer.among
exports.except = stemmer.except
