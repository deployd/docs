<!--{
  title: 'Building a custom run script in Node.js',
  tags: ['node', 'module', 'server', 'deployment']
}-->

## Building a custom run script in Node.js

When running in non-local environments we recommend using a simple node script to start your deployd server. With each environment using its own script, you can easily separate out environmental variables (such as connection information) and actions (such as clearing out a test database).

### Example - Production

    // production.js
    var deployd = require('deployd');

    var server = deployd({
      port: process.env.PORT || 5000,
      env: 'production',
      db: {
        host: 'my.production.mongo.host',
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

### Example - Staging

    // staging.js
    var deployd = require('deployd');

    var server = deployd({
      port: process.env.PORT || 5000,
      env: 'staging',
      db: {
        host: 'my.production.mongo.host',
        port: 27105,
        name: 'my-db',
        credentials: {
          username: 'username',
          password: 'password'
        }
      }
    });

    // remove all data in the 'todos' collection
    var todos = server.createStore('todos');
      
    todos.remove(function() {
      // all todos removed
      server.listen();
    });

    server.on('error', function(err) {
      console.error(err);
      process.nextTick(function() { // Give the server a chance to return an error
        process.exit();
      });
    });
    
### Running Your App in Production

To run your app as a daemon use the `forever` module. You can install it from npm.

    npm install forever -g
    
Then start the appropriate run script based on your environment.

    forever start production.js
    
This will daemonize your app and make sure it runs even after it crashes.