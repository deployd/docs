#!/usr/bin/env node

var Path = require('path');
var getDpdModules = require('./getDpdModules.js');
var ghpages = require('gh-pages');

var outputFile = __dirname + '/../_site/javascripts/module-control.data.js';
getDpdModules(outputFile, function(){
    console.log('Done getDpdModules');


    // publish _site to 'origin gh-pages' (So make sure your 'origin' remote point to "https://github.com/[Your_Username]/deployd-docs")
    var options = {
        message: 'Auto-generated deployd docs',
    }
    ghpages.publish(Path.join(__dirname, '../_site'), options, function(err) {
        console.error(err || 'Pushed');
    });
});
