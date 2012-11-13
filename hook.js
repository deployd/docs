/**
 * handles POST from github and restarts
 */

require('shelljs/global');

function restart() {
	
}

var http = require('http');

http.createServer(function (req, res) {
  var output = '';
  
  if(req.url === '/hook') {
    output += exec('git pull origin master').output;
    console.log('restarting docs.deployd.com %s', new Date().toString());
  }
  
  res.end(output);
})
.listen(3000);