var cluster = require('cluster')
  , workers = 4;

if(cluster.isMaster) {
  while(workers--) {
    cluster.fork();
  }
  
  cluster.on('listening', function (worker) {
    console.log('worker', worker.id, 'listening');
  });
} else {
  require('./app');
}