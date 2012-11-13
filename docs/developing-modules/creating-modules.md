<!--{
  title: 'Creating a Module',
  tags: ['modules', 'custom', 'extending']
}-->

## Creating a Module

### Background

Deployd modules are 100% compatible with regular [node modules](http://npmjs.org). This means you can use any of the 17,000+ node modules when building your Deployd app.

### Hello World

Any module in your app's `node_modules` folder will be loaded when the Deployd server starts.

You don't have to `require()` or load anything to instantiate your module. The following will log 'hello world' when you run `dpd`.

    // /my-app/node_modules/hello.js
    console.log('hello world');
    
### Accessing the Server

In order to do anything interesting you need a reference to the current Deployd [server](/docs/developing-modules/internal-api/server.md) object. The server is always available at `process.server`. This means you don't need to require anything to use most of the [internal APIs](/docs/developing-modules/internal-api/collection.md).

### One Off Modules

The simplest kind of module is a **one-off module**. These are easy to create but hard to reuse. Typically any behavior that is specific to just your app that can't be implemented using an existing module can be built with a simple **one-off module**. 

Here's an example one off module that maintains a count of requests to the url `/hits` and writes it to a file every minute.

    // /my-app/node_modules/hits.js
    var fs = require('fs');
    process.server.hits = 0;

    process.server.on('request', function(req) {
      if(req.url === '/hits') {
        process.server.hits++;
      }
    });

    // write a file every minute
    setInterval(function() {
      fs.writeFile('hits.json', JSON.stringify({hits: process.server.hits}));
    }, 60000);

### Reusable Modules

Modules can also expose useful APIs of their own. The simplest way to create reusable modules is to define a `Resource Type`. `Resource Types` are exposed in the dashboard and are much easier to reuse, and you can share them with other Deployd developers. See the [custom resource type guide](/docs/developing-modules/custom-resource-types.md) for more info.

