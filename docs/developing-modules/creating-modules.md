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

### Resource Types

Modules can also expose useful APIs of their own. The simplest way to create reusable modules is to define a `Resource Type`. `Resource Types` are exposed in the dashboard and are much easier to reuse, and you can share them with other Deployd developers. See the [custom resource type guide](/docs/developing-modules/custom-resource-types.md) for more info.


### Reusable Modules

You can define advanced Modules as well by extending the `Module` type. These modules can be configured and can modify the way the server works in more abstract ways.

Modules can also encapsulate several Resource Types. Here is an example of a basic Module which defines two resource types:

    var Module = require('deployd').Module;

    module.exports = Module.extend({
      init: function() {
        this.addResourceType(require('./resource-type-1'));
        this.addResourceType(require('./resource-type-2'));
      }
    });


### Common Pitfalls

Deployd is designed to be run on the cloud, which is very different from a local development environment. As a module developer, you should create reusable modules that solve the problems that come along with cloud development once and can be customized by you and other users. Here are some things to keep in mind when developing modules:

#### Don't store state in memory

In the cloud, a server could be stopped or started at any time. In addition, in development mode, Deployd will recreate Resources and Modules on every request in order to keep the server up to date with its config without needing to restart. As a result, you can't depend on any value being accessible in memory or as an instance member. 

It's recommended that you write to the database if you want to store state.

#### Don't write to the file system

A cloud app's file system is not synced between different instances, and is lost whenever a server shuts down. For example, if you store file uploads in an `upload` folder on your app, it may work well on your local development environment, but in production, your users will find that their uploads are not reliably accessible, and may disappear entirely after a time.

If you only need to store state or object data, write to the database. It's recommended that you upload files to an external service, such as Amazon S3.

#### Be careful with scheduled jobs

Be cautious when setting up tasks to run which aren't caused by an HTTP or WebSockets request. In a cloud environment with multiple instances, your task could inadvertantly execute more than once, which, depending on the task, could be wasteful or destructive.

Instead of using a naive approach such as `setInterval` or `setTimeout` to schedule tasks, consider creating a job queue which is stored in the database. Keep an eye out for an official Job Queue module.