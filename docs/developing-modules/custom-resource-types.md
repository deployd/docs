<!--{
	title: 'Creating a Custom Resource Type',
	tags: ['modules', 'custom', 'extending', 'resource', 'type']
}-->

## Creating a Custom Resource Type

Deployd modules can register new *Resource Types*, which can be created with a route and configured per instance. Deployd comes with two built-in Resource Types: "Collection" and "User Collection". You can create your own custom resource types by extending the [Resource](./internal-api/resource.md) constructor and implementing a `handle()` method. Deployd will automatically load any Resource Types that are exported by a module.

Here is a simple custom resource type:

	var Resource = require('deployd/lib/resource')
		, util = require('util');

	function Hello(name, options) {
		Resource.apply(this, arguments);
	}
	util.inherits(Hello, Resource);
	module.exports = Hello;

	Hello.prototype.clientGeneration = true;

	Hello.prototype.handle = function (ctx, next) {
		if(ctx.req && ctx.req.method !== 'GET') return next();

		ctx.done(null, {hello: 'world'});
	}

This will allow you to add a "Hello" resource in the Dashboard. This resource will respond to every GET request with `{"hello": "world"}`.

### Example Resource Type

The most basic Custom Resource Type that is useful is the [Event Resource](/docs/using-modules/official/event.md), which will simply execute an `On GET` event when it receives a `GET` request and an `On POST` event when it receives a `POST` request.

 This is the source for that module: 

	var Resource = require('deployd/lib/resource')
		, util = require('util');

	function EventResource() {
		Resource.apply(this, arguments);
	}
	util.inherits(EventResource, Resource);

	EventResource.label = "Event";
	EventResource.events = ["get", "post"];

	module.exports = EventResource;

	EventResource.prototype.clientGeneration = true;

	EventResource.prototype.handle = function (ctx, next) {
		var parts = ctx.url.split('/').filter(function(p) { return p; });

		var result = {};

		var domain = {
				url: ctx.url
			, parts: parts
			, query: ctx.query
			, body: ctx.body
			, 'this': result
			, setResult: function(val) {
				result = val;
			}
		};

		if (ctx.method === "POST" && this.events.post) {
			this.events.post.run(ctx, domain, function(err) {
				ctx.done(err, result);
			});
		} else if (ctx.method === "GET" && this.events.get) {
			this.events.get.run(ctx, domain, function(err) {
				ctx.done(err, domain.result);
			});
		} else {
			next();
		}
	};

Let's look at it line-by-line:

	var Resource = require('deployd/lib/resource')
		, util = require('util');

 To create a Resource, you'll need the [Resource](internal-api/resource.md) module and Node's [util](http://nodejs.org/api/util.html) module.

	function EventResource() {
		Resource.apply(this, arguments);
	}

Creates the constructor for the `EventResource`, also applying the base `Resource` constructor. 

	util.inherits(EventResource, Resource);

Causes `EventResource` to inherit its prototype from `Resource` using Node's [util.inherits()](http://nodejs.org/api/util.html#util_util_inherits_constructor_superconstructor) function.

	EventResource.label = "Event";

Changes the [Resource.label](internal-api/resource.md#s-Resource.label) property to set how the `EventResource` appears in the "Add Resource" menu in the Dashboard. Without this setting, it would appear using the constructor name, `EventResource`.

	EventResource.events = ["get", "post"];

Configures two [events](internal-api/resource.md#s-Resource.events) for the Resource type: `get` and `post`. These will appear on the "Events" page in the Dashboard with no extra configuration. 

*Note: The Dashboard provides the "On" prefix, e.g. "On Get"*

	module.exports = EventResource;

Exports the `EventResource` constructor. This is how Deployd finds and loads the resource type.

	EventResource.prototype.clientGeneration = true;

Sets the [clientGeneration](internal-api/resource.md#s-resource.clientGeneration) flag, which ensures that resources created with this resource type will be generated into dpd.js.

	EventResource.prototype.handle = function (ctx, next) {

Defines a [handle()](internal-api/resource.md#s-resource.handle-ctx-next) function. This function will be called whenever a request is routed to this resource. The `ctx` object is a [Context](internal-api/context.md), which includes useful properties ([body](internal-api/context.md#s-ctx.body), [query](internal-api/context.md#s-ctx.query), etc.) and functions (particularly [done()](internal-api/context.md#s-ctx.done-err-result)) to simplify working with HTTP.

The `next` function gives control back to the router.

	var parts = ctx.url.split('/').filter(function(p) { return p; });

	var result = {};

Set up some local variables; `parts` is an array of the `/`-seperated parts in the URL.

	var domain = {
			url: ctx.url
		, parts: parts
		, query: ctx.query
		, body: ctx.body
		, 'this': result
		, setResult: function(val) {
			result = val;
		}
	};

Create a *domain* for the events. These are objects and functions that will be accessible from the event. Notice that the `setResult` function is a closure that assigns its argument to the local `result` variable.

	if (ctx.method === "POST" && this.events.post) {
		this.events.post.run(ctx, domain, function(err) {
			ctx.done(err, result);
		});
	}

Run the `POST` event using the [Script.run()](internal-api/script.md#s-script.run-ctx-domain-[fn]) function if applicable, passing it the current context and domain. 

The [this.events](internal-api/resource.md#s-Resource.events) object contains all of the available events; if the user has not written a `POST` event, though, `this.events.post` might be `null`.

The callback for `Script.run` returns an error `err` if something went wrong in the script (or if the script writer called [cancel()](/docs/using-modules/reference/event-api.md#s-cancel)

Finally, call [ctx.done()](internal-api/context.md#s-ctx.done-err-result) with both the error and result (`result` is the local variable we set up earlier which the scriptwriter can change using `setResult()`. The response body is always the second parameter, but it is ignored if an error is passed.

	} else if (ctx.method === "GET" && this.events.get) {
		this.events.get.run(ctx, domain, function(err) {
			ctx.done(err, domain.result);
		});
	}

Do the same thing for the `GET` event.

	} else {
		next();
	}

If no event applies, call `next()`. This tells the router that this resource cannot handle the current request, and the router will allow other resources to handle it. If every resource calls `next()`, then Deployd will return a `404` status code.