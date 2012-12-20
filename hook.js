/**
 * handles POST from github and restarts
 */

require('shelljs/global');

var allowed = ['207.97.227.253', '50.57.128.197', '108.171.174.178'];

var http = require('http');

http.createServer(function (req, res) {
  var output = '';
  var ip = req.socket.remoteAddress;
  
  if(allowed.indexOf(ip) === -1) {
    console.error('unkown ip trying hook! ' + ip);
    res.statusCode = 401;
    res.end('not allowed');
    return;
  }
  
  if(req.url === '/hook') {
    output += exec('git stash').output;
    output += exec('git pull origin master').output;
    output += exec('forever restart start.js').output;
    console.log('restarting docs.deployd.com %s', new Date().toString());
    console.log(output);
  }
  
  res.end(output);
})
.listen(3000);