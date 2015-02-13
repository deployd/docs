<!--{
  title: 'Event API for Custom Resources',
  tags: ['event', 'custom', 'resource']
}-->

## Event API for Custom Resources

### Background

Custom Resources may load **event scripts** to allow you to inject business logic during requests to the resource. For example, the collection resource exposes an event called *validate*. Given the following todo resource folder:

    /my-app
      /resources
        /todos
          validate.js

The collection resource would load the contents of `validate.js` as the `validate` event.

### Default Event Script Domain

Event scripts do not share a global scope with other modules in your app. Instead each time an event script is run, a new scope is created for it.

The following functions and objects are available to all event scripts.

#### ctx <!-- ctx -->

The context of the request. This object contains everything from the request (request, response, body, headers, etc...):

    // Example:
    if (ctx && ctx.req && ctx.req.headers && ctx.req.headers.host !== '192.168.178.34:2403') {
      cancel("You are not authorized to do that", 401);
    }

The entire object is [available as a gist here](https://gist.github.com/NicolasRitouet/2fc5dd20f3af7dc7e192).

#### me <!-- api -->

The current user if one exists on the current `Context`.

#### isMe() <!-- api -->

    isMe(id)

Returns true if the current user (`me`) matches the provided `id`.

#### this <!-- api -->

If the resource does not implement a custom domain, this will be an empty object. Otherwise `this` usually refers to the current domain's instance (eg. an object in a collection).

#### cancel() <!-- api -->

    cancel(message, [statusCode])

Stops the current request with the provided error message and HTTP status code. Status code defaults to `400`.

#### cancelIf(), cancelUnless() <!-- api -->

    cancelIf(condition, message, [statusCode])
    cancelUnless(condition, message, [statusCode])

Calls `cancel(message, statusCode)` if the provided condition is truthy (for `cancelIf()`) or falsy (for `cancelUnless`).

#### internal <!-- api -->

A boolean property, true if this request has been initiated by another script.

#### isRoot <!-- api -->

A boolean property, true if this request is authenticated as root (from the dashboard or a custom script).

#### query <!-- api -->

The current HTTP query. (eg ?foo=bar - query would be {foo: 'bar'}).

#### emit() <!-- api -->

    emit([userCollection, query], message, [data])

Emits a realtime message to the client. You can use `userCollection` and `query` parameters to limit the message broadcast to specific users.

#### console <!-- api -->

Support for console.log() and other console methods.
