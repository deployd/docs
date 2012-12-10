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

