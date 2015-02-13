<!--{
  title: 'Using Deployd as an Express middleware',
  tags: ['express', 'connect', 'middleware', 'server']
}-->

## Using Deployd as an Express middleware

Deployd can be used with express/connect. Deployd will attach functions and handler to express server object.

### Installing

For an app in your current directory:

    npm install deployd express socket.io@0.9.x

### Hello World

Here is a simple *hello world* using Deployd as an express middleware.

    // hello-server-attach.js
    var PORT = process.env.PORT || 3000;
    var ENV = process.env.NODE_ENV || 'development';

    // setup http + express + socket.io
    var express = require('express');
    var app = express();
    var server = require('http').createServer(app);
    var io = require('socket.io').listen(server, {'log level': 0});

    // setup deployd
    require('deployd').attach(server, {
        socketIo: io,  // if not provided, attach will create one for you.
        env: ENV,
        db: {host:'localhost', port:27017, name:'test-app'}
    });

    // After attach, express can use server.handleRequest as middleware
    app.use(server.handleRequest);

    // start server
    server.listen(PORT);


Run this like any other express server.

    node hello-server-attach.js

### Server Options <!-- ref -->

- **db** {Object} - the database to connect to
 - **db.connectionString** {String} - The URI of the mongoDB using [standard Connection String](http://docs.mongodb.org/manual/reference/connection-string/). If `db.connectionString` is set, the other db options are ignored.
 - **db.port** {Number} - the port of the database server
 - **db.host** {String} - the ip or domain of the database server
 - **db.name** {String} - the name of the database
 - **db.credentials** {Object} - credentials for db
  - **db.credentials.username** {String}
  - **db.credentials.password** {String}
- **env** {String} - the environment to run in.
- **socketIo** {Object} - socket.io instance.

*Note: If options.env is "development", the dashboard will not require authentication and configuration will not be cached. Make sure to change this to "production" or something similar when deploying.*

### Caveats

- Deployd mounts its server on `process.server`. This means you can only run one Deployd server in a process.
- Deployd loads resources from the `process.cwd`. Add this to ensure you are in the right directory: `process.chdir(__dirname)`.
- In order to access the `/dashboard` without a key you must run Deployd with the `env` option set to `development`.
