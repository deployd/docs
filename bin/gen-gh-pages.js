#!/usr/bin/env node

var Path = require('path');
var ghpages = require('gh-pages');


// publish _site to 'origin gh-pages' (So make sure your 'origin' remote point to "https://github.com/[Your_Username]/deployd-docs")
var options = {
    message: 'Auto-generated deployd docs',
}
ghpages.publish(Path.join(__dirname, '../_site'), options, function(err) {
    console.error(err || 'Pushed');
});
