var ghpages = require('gh-pages');
var Path = require('path');


var options = {
    //repo: 'https://github.com/deployd/docs',
    message: 'Auto-generated deployd docs',
}

ghpages.publish(Path.join(__dirname, '_site'), options, function(err) {
    console.error(err || 'Pushed');
});
