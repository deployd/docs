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
    return;
  }
  
  if(req.url === '/hook') {
    output += exec('git pull origin master').output;
    console.log('restarting docs.deployd.com %s', new Date().toString());
  }
  
  res.end(output);
})
.listen(3000);