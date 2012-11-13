<!--{
  title: 'Resource Types',
  tags: ['resource', 'type']
}-->

## Resource Types

Resources are the building block of a Deployd app. They provide a way to handle http requests at a root url. They must implement a `handle(ctx, next)` method that either handles a request or calls `next()` to give the request back to the router.

Resources can also be attributed with meta-data to allow the dashboard to dynamically render an editor gui for configuring a resource instance.

### Events / Scripts

A `Resource` can execute `Script`s during the handling of an http request when certain events occur. This allows users of the resource to inject logic during specific events during an http request without having to extend the resource or create their own.

For example, the `Collection` resource executes the *get.js* event script when it retrieves each object from its store. If a *get.js* file exists in the instance folder of a resource (eg. `/my-project/resources/my-collection/get.js`), it will be pulled in by the resource and exposed as `myResource.scripts.get`.

### Class: Resource <!-- ref -->

A `Resource` inherits from `EventEmitter`. The following events are available.

 - `changed`      after a resource config has changed
 - `deleted`      after a resource config has been deleted

Inheriting from Resource:

    var Resource = require('deployd/lib/resource')
      , util = require('util');
      
    function MyResource(name, options) {
      // run the parent constructor
      // before using any properties/methods
      Resource.apply(this, arguments);
    }
    util.inherits(MyResource, Resource);
    module.exports = MyResource;

* `name` {String}

The name of the resource.

* `options` {Object}

 - `configPath`        the project relative path to the resource instance
 - `path`              the base path a resource should handle
 - `db` *(optional)*   the database a resource will use for persistence
 - `config`            the instance configuration object
 - `server`            the server object

The following resource would respond with a file at the url `/my-file.html`.

    function MyFileResource(name, options) {
      Resource.apply(this, arguments);

      this.on('changed', function(config) {
        console.log('MyFileResource changed', config);
      });
    }
    util.inherits(MyFileResource, Resource);

    MyFileResource.prototype.handle = function (ctx, next) {
      if (ctx.url === '/my-file.html') {
        fs.createReadStream('my-file.html').pipe(ctx.res);
      } else {
        next();
      }
    }



### Overriding Behavior

Certain methods on a `Resource` prototype are called by the runtime. Their default behavior should be overridden to define an inherited `Resources` behavior.

### resource.handle(ctx, next) <!-- api -->

Handle an incoming request. This gets called by the router.

The resource can either handle this context and call `ctx.done(err, obj)` with an error or result JSON object, or call `next()` to give the context back to the router. If a resource calls `next()` the router might find another match for the request, or respond with a `404`.

* ctx {[Context](/docs/developing-modules/internal-api/context.md)}

The http context created by the `Router`. This provides an abstraction between the actual request and response. A `Resource` should call `ctx.done` or pipe to `ctx.res` if it can handle a request. Otherwise it should call `next()`.

Override the handle method to return a string:

    function MyResource(settings) {
      Resource.apply(this, arguments);
    }
    util.inherits(MyResource, Resource);

    MyResource.prototype.handle = function (ctx, next) {
      // respond with the file contents (or an error if one occurs)
      fs.readFile('myfile.txt', ctx.done);
    }
    
### resource.load(fn) <!-- api -->

Load any dependencies and call `fn(err)` with any errors that occur. This is automatically called by the runtime to support asynchronous construction of a resource (such as loading files).

*Note: If this method is overridden, the super method must be called to support loading of the `MyResource.events` array.*

### resource.clientGeneration <!-- api -->

If `true`, ensures that this resource is included in `dpd.js`.

    MyResource.prototype.clientGeneration = true;

### resource.config <!-- api -->

The instance configuration object; used to access the resource's configuration from member functions.

    MyResource.prototype.handle = function (ctx, next) {
      fs.readFile(this.config.filePath, ctx.done);
    }

### External Prototype  <!-- ref -->

This is a special type of prototype object that is used to build the `dpd` object. Each function on the `Resource.external` prototype `Object` are exposed externally in two places

 1. To the generated `dpd.js` browser JavaScript client
 2. To the `Context.dpd` object generated for inter-resource calls
    
Here is an example of a simple resource that exposes a method on the external prototype.

`/my-project/node_modules/example.js`

    var util = require('util');
    var Resource = require('deployd/lib/resource');
    function Example(name, options) {
      Resource.apply(this, arguments);
    }
    util.inherits(Example, Resource);

    Example.external = {};

    Example.external.hello = function(options, ctx, fn) {
      console.log(options.msg); // 'hello world'
    }

When the `hello()` method is called, a context does not need to be provided as the `dpd` object is built with a context. A callback may be provided which will be executed with results of `fn(err, result)`.

`/my-project/public/hello.js`

    dpd.example.hello({msg: 'hello world'});
    
`/my-project/resources/other-resource/get.js`

    dpd.example.hello({msg: 'hello world'});

### Resource.events <!-- api -->

* {Array}

If a `Resource` constructor includes an array of events, it will try to load the scripts in its instance folder (eg. `/my-project/resources/my-resource/get.js`) using [resource.loadScripts(eventNames, fn)](#s-resource.load-fn).

    MyResource.events = ['get'];
    
This will be available to each instance of this resource as `this.events`. 

`/my-project/node_modules/my-resource.js`

    MyResource.prototype.handle = function(ctx, next) {
      if(this.events && this.events.get) {
        var domain = {
          say: function(msg) {
            console.log(msg); // 'hello world'
          }
        }
        this.events.get.run(ctx, domain, ctx.done);
      }
    }

`/my-project/resources/my-resource/get.js`

    say('hello world');

### Resource.label <!-- api -->

The resource type's name as it appears in the dashboard. If this is not set, it will appear with its constructor name.

    Hello.label = 'Hello World';

### Resource.defaultPath <!-- api -->

The default path suggested to users creating a resource. If this is not set, it will use the constructor's name in lowercase.

    Hello.defaultPath = '/hello-world'; 

### Collection.basicDashboard <!-- api -->

Set this property to an object to create a custom configuration page for your resource type.

- `settings` - An array of objects describing which properties to display. 
- `name` - The name of the property. This is how the value will be passed into the `config` object, so make sure it's something JavaScript-friendly, e.g. `maxItems`.
- `type` - The type of control to edit this property. Allowed types are `text`, `textarea`, `number`, and `checkbox`.
- `description` (Optional) - Explanatory text to appear below the field.

<!-- separate -->

    Hello.basicDashboard = {
      settings: [{
          name: 'propertyName',
          type: 'text',
          description: "This description appears below the text field"
      }, {
          name: 'longTextProperty',
          type: 'textarea'
      }, {
          name: 'numericProperty',
          type: 'number'
      }, {
          name: 'booleanProperty',
          type: 'checkbox'
      }]
    };

The above sample will produce the following dashboard page:

![Example basic dashboard](/images/basic-dashboard.png)

### Collection.dashboard <!-- api -->

A resource can describe the dependencies of a fully custom dashboard editor UI. This will be passed to the dashboard during rendering to create a custom UI.

This example creates the custom dashboard for the `Collection` resource. It automatically includes pages and page-specific scripts:

    Collection.dashboard = {
        path: path.join(__dirname, 'dashboard')
      , pages: ['Properties', 'Data', 'Events', 'API']
      , scripts: [
          '/js/ui.js'
        , '/js/util.js'
      ]
    }

* `path` {String}

The absolute path to this resource's dashboard

* `pages` {Array} *(optional)*

An array of pages to appear in the sidebar. If this is not provided, the only page available will be "Config" (and "Events", if `MyResource.events` is set).

The dashboard will load content from `[current-page].html` and `js/[current-page].js`.

*Note: The "Config" page will load from `index.html` and `js/index.js`.*

* `scripts` {Array} *(optional)*

An array of extra JavaScript files to load with the dashboard pages.

#### Dashboard asset loading <!-- ref -->

When you request a page from a custom dashboard, it will load the following files, if they are available, from the `dashboard.path`:

 - `[current-page].html`
 - `js/[current-page].js`
 - `style.css`

The default page is `index`; the `config` page will also redirect to `index`. 

The `config` or `index` page will load the basic dashboard if no `index.html` file is provided.
The `events` page will load the default event editor if no `events.html` file is provided.

It will also load the JavaScript files in the `dashboard.scripts` property.

#### Creating a custom dashboard

##### Event editor control <!-- ref -->

To embed the event editor in your dashboard, include this empty div:
  
    <div id="event-editor" class="default-editor"></div>

##### Styling <!-- ref -->

For styling, the dashboard uses a re-skinned version of [Twitter Bootstrap 2.0.2](http://twitter.github.com/bootstrap/). 

##### JavaScript <!-- ref -->

The dashboard provides several JavaScript libraries by default:

- [jQuery 1.7.2](http://jquery.com/)
- [jquery.cookie](https://github.com/carhartl/jquery-cookie/)
- [Underscore 1.3.3](http://underscorejs.org/)
- [Twitter Bootstrap 2.0.2](http://twitter.github.com/bootstrap/javascript.html)
- [UIKit](http://visionmedia.github.com/uikit/)
- [Ace Editor](https://github.com/ajaxorg/ace) (no-conflict version)
    - JavaScript mode
    - JSON mode
    - Custom theme for the Dashboard (`ace/theme/deployd`)
- [Google Code Prettify](http://code.google.com/p/google-code-prettify/)
- dpd.js
    - *Note:* all dpd.js requests will be sent as [root](/docs/collections/reference/http.md#s-root-requests)

Within the dashboard, a `Context` object is available:

    //Automatically generated by Deployd:
    window.Context = {
      resourceId: '/hello', // The id of the current resource
      resourceType: 'Hello', // The type of the current resource
      page: 'properties', // The current page, in multi-page dashboards
      basicDashboard: {} // The configuration of the basic dashboard
    };

You can use this to query the current resource:

    dpd(Context.resourceId).get(function(result, err) {
      //Do something
    });

In the dashboard, you also have access to the special `__resources` resource, which lets you update your app's configuration files:

    // Get the config for the current resource
    dpd('__resources').get(Context.resourceId, function(result, err) {
      //Do something
    });
    
    // Set a property for the current resource
    dpd('__resources').put(Context.resourceId, {someProperty: true}, function(result, err) {
      //Do something
    });
    
    // Set all properties for the current resource, deleting any that are not provided
    dpd('__resources').put(Context.resourceId, {someProperty: true, $setAll: true}, function(result, err) {
      //Do something
    });
    
    // Save another file, which will be loaded by the resource
    dpd('__resources').post(Context.resourceId + '/content.md', {value: "# Hello World!"}, function(result, err)) {
      //Do something
    });