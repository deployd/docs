<!--{
  title: 'Deploying to your own Server',
  tags: ['guide', 'deploy', 'hosting']
}-->

## Deploying to your own Server

You can also deploy your app on your server, or on a cloud hosting service such as EC2 or Heroku. The server must support [Node.js](http://nodejs.org/). 

Deployd also requires a [MongoDB](http://www.mongodb.org/) database, which can be hosted on the same server or externally. 

If you have root shell access on the deployment server, you can install Deployd on it using the command `npm install -g deployd`. 
Otherwise, you will need to install Deployd as a dependency of your app itself using `npm install deployd` in the root directory of your app.

You can use the `dpd` CLI to run your server; this will start up an instance of MongoDB automatically, using the "data" folder. (Requires MongoDB installed on the server)

## Dashboard Accesss

To set up the dashboard on your server, type `dpd keygen` on your server's command line to create a remote access key. Type `dpd showkey` to get the key; you should store this somewhere secure.

You can then go to the `/dashboard` route on the server and type in that key to gain access.

## Server Script

For more control, you can create a simple script to run the server. Here's an example:

    // index.js
    var deployd = require('deployd');

    var server = deployd({
      port: process.env.PORT || 5000,
      env: 'production',
      db: {
        host: 'my.mongo.host',
        port: 27105,
        name: 'my-db',
        credentials: {
          username: 'username',
          password: 'password'
        }
      }
    });

    server.listen();

    server.on('listening', function() {
      console.log("Server is listening");
    });

    server.on('error', function(err) {
      console.error(err);
      process.nextTick(function() { // Give the server a chance to return an error
        process.exit();
      });
    });

*Note: Some hosts do not support WebSockets, so `dpd.on()` may not work correctly on certain deployments.*