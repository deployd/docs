<!--{
  title: 'Server',
  tags: ['resource', 'type']
}-->

## Server

Deployd's `Server` extends node's `http.Server`. A `Server` is created with an options object that tells Deployd what port to serve on and which database to connect to.

The `Server` object is also the main entry point for modules. After it is started, the `Server` instance is available at `process.server`.

### Class: Server

Servers are created when calling the Deployd exported function.

    var deployd = require('deployd')
      , options = {port: 3000}
      , server = deployd(options);
    
* `options` {Object}

  - **port** {Number} - the port to listen on
  - **db** {Object} - the database to connect to
   - **db.port** {Number} - the port of the database server
   - **db.host** {String} - the ip or domain of the database server
   - **db.name** {String} - the name of the database
   - **db.credentials** {Object} - credentials for db
    - **db.credentials.username** {String}
    - **db.credentials.password** {String}
  - **env** {String} - the environment to run in.
  - **dir** {String} - the base directory to load config from (will not change the current working directory).
  - **errorTemplate** {String} - change the default error template. Checkout an [example](https://github.com/ritch/doh/blob/master/assets/error.html).
  

*Note:* If `options.env` is "development", the dashboard will not require authentication and configuration will not be cached. Make sure to change this to "production" or something similar when deploying.

### Server.listen([port], [host]) <!-- api -->

Load any configuration and start listening for incoming connections.

    var dpd = require('deployd')
      , server = dpd()
  
    dpd.listen();
    dpd.on('listening', function() {
      console.log(server.options.port); // 2403
    });
    
### Server.createStore(namespace)  <!-- api -->

Create a new `Store` for persisting data using the database info that was passed to the server when it was created.

    // Create a new server
    var server = new Server({port: 3000, db: {host: 'localhost', port: 27015, name: 'my-db'}});

    // Attach a store to the server
    var todos = server.createStore('todos');

    // Use the store to CRUD data
    todos.insert({name: 'go to the store', done: true}, ...); // see `Store` for more info

### Server.executeMiddleware(type, args, callback, [options]) <!-- api -->

Executes a stack of [middleware](/docs/developing-modules/middleware.md) defined by modules.

- `type` - The type of middleware to execute
- `args` - An array of arguments to pass to the middleware functions
- `callback` - A callback with the signature `function(error, args...)` that will run when the stack is finished or when it throws an error. If there was no error, the callback will be passed the original `args` with any modifications that the middleware may have made.
- `options` (Optional) - An object with additional settings for executing middleware:
  - `timeout` - The default time in milliseconds before the function will consider a middleware function to have timed out. Defaults to 2000 (2 seconds). Has no effect if `onTimeout` is not set.
  - `onTimeout` - A function that will be called with the signature `function(middleware)` if the middleware stack times out. The `middleware` argument is the specific middleware object that timed out - you can use its `module` property and `name` property (if the latter is available) to inform the user that they probably forgot to call `next()`.

<!-- seperate -->

    var result = {};
    server.executeMiddleware('custom-middleware', [result], function(err, finalResult) {
      if (finalResult.foo) {
        console.log("Bar");
      } else {
        console.log("Baz");
      }
    }, {
      onTimeout: function(middleware) {
        console.error("Error: custom middleware timed out on " + middleware.module + " " + middle.name);  
      }
    })
    
### Server.sockets <!-- api -->

The **socket.io** sockets `Manager` object ([view source](https://github.com/LearnBoost/socket.io/blob/master/lib/manager.js)).

### Server.sessions <!-- api -->

The server's [SessionStore](/docs/developing-modules/internal-api/session-store.md).

### Server.router <!-- api -->

The server's `Router`.

### Server.resources <!-- api -->

An `Array` of the server's [Resource](/docs/developing-modules/internal-api/resource.md) instances. These are built from the config and type loaders.