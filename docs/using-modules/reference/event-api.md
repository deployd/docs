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
      
The collection resource would run the contents of `validate.js` every time the `validate` event occurs.

### Default Event Script Domain

Event scripts do not share a global scope with other modules in your app. Instead each time an [event script](/developing-modules/internal-api/script) is run a [domain](/terms/domain) object is constructed as the global scope.

The following functions and objects are available to all event scripts.

#### me <!-- api -->

The current user if one exists on the current `Context`.

#### this <!-- api -->

If the resource does not implement a custom domain, this will be an empty object. Otherwise `this` usually refers to the current domain's instance (eg. an object in a collection).

#### internal <!-- api -->

A boolean property, true if this request has been initiated by another script.

#### isRoot <!-- api -->

A boolean property, true if this request is authenticated as root (from the dashboard or a custom script).

#### query <!-- api -->

The current HTTP query. (eg ?foo=bar - query would be {foo: 'bar'}).

#### console <!-- api --> 

Support for console.log() and other console methods.