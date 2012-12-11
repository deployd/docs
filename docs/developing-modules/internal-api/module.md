<!--{
  title: 'Modules',
  tags: 'module', 'extension']
}-->

## Modules

Modules allow you to extend Deployd's functionality by adding [Resource Types](/docs/developing-modules/internal-api/resource.md) and middleware. They are also able to execute arbitrary Node.js code in the context of the Deployd server.

Like Resource Types, Modules can be attributed with dashboard metadata which describes how users can configure them.

### Class: Module <!-- api -->

Inheriting from Module:

    var Module = require('deployd').Module;

    module.exports = Module.extend({
      init: function(options) {
        // Set up any values that you'll need to use
      }
    });

Constructing a Module instance:

    var Module = require('deployd').Module;

    var myModule = new Module('MyModule', {
      config: {
        someOption: true
      },
      server: process.server
    });

* `name` {String}

The name of the module.

* `options` {Object}

 - `config`            the instance configuration object
 - `server`            the server object

*Note: In the remaining code samples on the page, the `var Module = require('deployd').Module` and `module.exports = Module.extend` lines have been left out for brevity, but are still required.*

### Initializing a Module

Certain methods on a `Module` are called by Deployd when it loads the module. Override these methods to define what your module does.

#### module.init(options) <!-- api -->

Called when the Module is created. Passed the `options` argument from the constructor. 

    Module.extend({
      init: function(options) {
        console.log("My Module is loaded");
      }
    });

*Note: Instances of modules are not persistent; they can be destroyed and recreated multiple times while the server is running, especially in the development environment where Deployd does not keep a long-lived cache.*

#### module.load(fn) <!-- api -->
 
Called when the Module is created, after `init()`. If you override this method, you must call the `fn(err)` callback with any errors that might occur.

The `load()` method allows you to load additional configuration asynchronously.

    Module.extend({
      load: function(fn) {
        var self = this;
        loadSomethingAsynchronously(function(err, result) {
          if (err) return fn(err);
          self.extraConfig = result;
        }
      }
    });


### Defining Features 

While initializing a module, you can call these methods to tell Deployd that your module provides a specific feature to the app.

#### module.addResourceType(resourceType) <!-- api -->

Adds a [Resource Type](/docs/developing-modules/internal-api/resource.md) to the app. The user will be able to create Resources of that type in the dashboard.

    var HelloResource = Resource.extend('HelloResource', {
      /* Define a resource type */
    });

    Module.extend({
      init: function(options) {
        this.addResourceType(HelloResource);
      }
    });

#### module.addResource(resource) <!-- api -->

Adds a Resource instance to the app. Incoming requests that match the resource's path will be routed but the resource will not appear in the dashboard.

    Module.extend({
      init: function(options) {
        this.addResource(new Collection('todos', {
          server: this.server,
          db: this.server.db,
          config: {
            properties: {
              name: "title",
              type: "string"
            }
          }
        }))
      }
    })

#### module.addMiddleware(type, [name], middleware, [options]) <!-- api -->

Adds [middleware](/docs/developing-modules/middleware.md) to the app. 

- `type` - The type of middleware to add.
- `name` (Optional) - The name of this middleware that will appear in the Dashboard. Strongly recommended if your app module more than one middleware of the same type.
- `middleware` - A function that takes in the middleware stack's arguments as well as a `next(err)` callback. This function will be bound so that `this` is the current module.
- `options` (Optional) - An object with additional properties:
  - `timeout` - The number of milliseconds before this middleware will be considered to have timed out. The module that executes the middleware stack will define the default. Has no effect if the middleware stack does not watch for timeouts.
  - `lenient` - If true, supresses errors that the middleware type does not exist - useful if you are making a module that can optionally extend another module if it is available.
  - `description` - A description of what this middleware does; will appear as a tooltip in the Dashboard.

<!-- seperate -->

    Module.extend({
      init: function(options) {

        this.addMiddleware('request', "Logger", function(ctx, next) {
          console.log(this.config.loggerName + ": " ctx.method + " " + ctx.url + " at " + new Date().toString());
          next();
        }, {
          timeout: 1000
        });

      }
    })

#### module.addMiddlewareType(type, [options]) <!-- api -->

Registers a middleware type for other modules to define middleware. Usually paired with `executeMiddleware()`.

`options` is an optional object with additional properties:
  - `friendlyName` - A string that will appear in the Dashboard as the name of this middleware type.
  - `description` - A description of when this middleware stack will execute. Will appear in the Dashboard.
  - `documentationLink` - An absolute link to a web page documenting this middleware type. Will appear in the Dashboard.