<!--{
  title: 'Collection Resource Type',
  tags: ['collection', 'resource', 'type']
}-->

## Collection Resource Type

Collections are the most common Resource Type in Deployd. They allow the user to store and load data from their app's [Store](/docs/developing-modules/internal-api/store.md). Behind the scenes, they validate incoming requests and execute event scripts for `get`, `post`, `put`, `delete`, and `validate`. If all event scripts execute without error (or `cancel()`ing), the request is proxied to the collection's `Store`.

### Class: Collection

A `Collection` inherits from `Resource`. Any constructor that inherits from `Collection` must include its own `Collection.external` prototype object.

Example inheriting from `Collection`:

    var Collection = require('deployd/lib/resources/collection');
    var util = require('util');

    function MyCollection(name, options) {
      Collection.apply(this, arguments);
    }
    MyCollection.external = Collection.external;

    util.inherits(MyCollection, Collection);

### collection.store <!-- api -->

* {Store}

The backing persistence abstraction layer. Supports saving and reading data from a database. See [Store](/docs/developing-modules/internal-api/store.md) for more info.

### collection.validate(body, create) <!-- api -->

Validate the request `body` against the Collection's properties
and return an object containing any `errors`.

* `body` {Object}

The object to validate

* `create` {Boolean}

Should validate a new object being created

* return `errors` {Object}

### collection.sanitize(body) <!-- api -->

Sanitize the request `body` against the Collection's properties 
object and return an object containing only properties that exist in the
`collection.config.properties` object.

* `body` {Object}
* return `sanitized` {Object}

### collection.sanitizeQuery(query) <!-- api -->

Sanitize the request `query` against the `collection.properties` 
and return an object containing only properties that exist in the
`collection.properties` object.

* `query` {Object}
* return `sanitizedQuery` {Object}

### collection.parseId(ctx) <!-- api -->

Parse the `ctx.url` for an id. Override this to change how an object's id is parsed out of a url.

* `ctx` {Context}

### collection.find(ctx, fn) <!-- api -->

Find all the objects in a collection that match the given `ctx.query`. Then execute a `get` event script, if one exists, using each object found. Finally call `fn(err)` passing an `error` if one occurred.

* `ctx` {Context}
* `fn(err)`

### collection.remove(ctx, fn) <!-- api -->

Execute a `delete` event script, if one exists, using each object found. Then remove a single object that matches the `ctx.query.id`. Finally call `fn(err)` passing an `error` if one occurred.

* `ctx` {Context}
* `fn(err)`

### collection.save(ctx, fn) <!-- api -->

First execute a `validate` event script if one exists. If the event does not error, try to save the `ctx.body` into the store. If `ctx.body.id` exists, perform an `update` and execute the `put` event script. Otherwise perform an `insert` and execute the `post` event script. Finally call `fn(err)`, passing an `error` if one occurred.

* `ctx` {Context}
* `fn(err)`




