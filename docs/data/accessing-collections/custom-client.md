<!--{
  title: 'Building a Custom Client',
  tags: ['reference', 'collection', 'http', 'websockets', 'cors']
}-->

## Accessing Collections - Building a Custom Client

In this guide we will build an HTTP client from scratch to perform CRUD as well as listen for events from a Collection.

### REST

Most REST clients should work with Deployd Collections right away, though Deployd does not strictly follow REST. For example, Backbone.js and Angular's http utilities work with Deployd without modification.

### WebSockets

To fully implement the Collection API, a client must be compatible with WebSockets and Socket.IO specifically. Clients are responsible for sending heartbeat information as well as reconnecting in the case of unexpected disconnects.
    
### Building a Node.js Client

The following is implemented in node but the basic idea can be applied to any language/platform.

#### Basics

First we need a basic constructor and request method.

    var request = require('request');

    function Collection(url) {
      this.url = url
    }

    Collection.prototype.request = function (options, fn) {
      var url = this.url;
  
      request(options, function (err, res, body) {
        options.url = url + (options.url || '');
    
        if(res.statusCode >= 400) {
          err = body || {message: 'an unknown error occured'};
          return fn(err);
        }
    
        fn(null, body);
      });
    }
    
This is actually everything we need to make HTTP requests to our Collection. Here's a simple query example:

    var c = new Collection('http://foo.deploydapp.com/todos');

    c.request({url: '?done=false'}, function(err, todos) {
      console.log(todos); // [...]
    });

This will create a new todo:

    var todo = {
      title: 'wash the car'
    };

    c.request({json: todo, method: 'POST'}, function(err, todo) {
      console.log(todo); // {id: '...', ...}
    });
    
Updating is also quite simple:

    var todo = {
      id: '06a5254f11ff7853',
      done: true
    };

    c.request({json: todo, method: 'PUT'}, function(err, todo) {
      console.log(todo); // {id: '...', ...}
    });

This will delete the todo:

    var id = '06a5254f11ff7853';

    c.request({url: '/' + id, method: 'DELETE'}, function(err, todo) {
      console.log(err); // null - if no error occurred
    });
    
### Listening to Events

The simplest way to listen events is to use a Socket.IO client. You can find a list of clients [here](https://github.com/LearnBoost/socket.io/wiki).

Using the node.js Socket.IO is simple:

    var io = require('socket.io-client');
    var socket = io.connect('http://foo.deploydapp.com');

    socket.on('my event', function (data) {
      console.log(data); // emit()ed from the server
    });