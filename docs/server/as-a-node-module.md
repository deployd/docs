<!--{
  title: 'Using Deployd as a Node.js Module',
  tags: ['node', 'module', 'server']
}-->

## Using Deployd as a Node.js Module

Deployd is a node module and can be used inside other node programs or as the basis of an entire node program.

### Installing

For an app in your current directory:

    npm install deployd

You can also install globally:

    npm install deployd -g

### Hello World

Here is a simple *hello world* using Deployd as a node module.

    // hello.js
    var deployd = require('deployd')
      , options: {port: 3000}
      , dpd = deployd();
  
    dpd.listen();
    
Run this like any other node program.
  
    node hello.js
    
### Server Options <!-- ref -->

- **port** {Number} - the port to listen on
- **db** {Object} - the database to connect to
 - **db.port** {Number} - the port of the database server
 - **db.host** {String} - the ip or domain of the database server
 - **db.name** {String} - the name of the database
 - **db.credentials** {Object} - credentials for db
  - **db.credentials.username** {String}
  - **db.credentials.password** {String}
- **env** {String} - the environment to run in.

*Note: If options.env is "development", the dashboard will not require authentication and configuration will not be cached. Make sure to change this to "production" or something similar when deploying.*

### Caveats

- Deployd mounts its server on `process.server`. This means you can only run one Deployd server in a process.
- Deployd loads resources from the `process.cwd`. Add this to ensure you are in the right directory: `process.chdir(__dirname)`.
- In order to access the `/dashboard` without a key you must run Deployd with the `env` option set to `development`. 