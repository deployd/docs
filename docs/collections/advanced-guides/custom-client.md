<!--{
  title: 'Building a Custom Client',
  tags: ['reference', 'collection', 'http', 'websockets', 'cors']
}-->

## Accessing Collections - Building a Custom Client
 
In this guide, we will build an HTTP client from scratch to perform CRUD as well as listen for events from a Collection.

### REST

Most REST clients should work with Deployd Collections right away, though Deployd does not strictly follow REST. For example, Backbone.js and AngularJS's HTTP utilities work with Deployd without modification.

### WebSockets

To fully implement the Collection API, a client must be compatible with WebSockets and Socket.IO specifically. Clients are responsible for sending heartbeat information as well as reconnecting in the case of unexpected disconnects.
    
### Building a Node.js Client

The following is implemented in [Node.js](http://nodejs.org/), but the basic idea can be applied to any language or platform.

#### Basics

All we need to create a collection client is a constructor and a single method for making requests.

    var request = require('request');

    function Collection(url) {
      this.url = url
    }

    Collection.prototype.request = function (options, fn) {
      var url = this.url;
  
      request(options, function (err, res, body) {
        options.url = url + (options.url || '');
    
        if(res.statusCode >= 400) {
          err = body || {message: 'an unknown error occurred'};
          return fn(err);
        }
    
        fn(null, body);
      });
    }
    
Now we can construct new collections by passing the URL as the only argument to our constructor.

    var c = new Collection('http://foo.deploydapp.com/todos');

    c.request({url: '?done=false'}, function(err, todos) {
      console.log(todos); // [...]
    });

We can add an object to our collection by passing an object as the json body and setting the `method` to "POST".

    var todo = {
      title: 'wash the car'
    };

    c.request({json: todo, method: 'POST'}, function(err, todo) {
      console.log(todo); // {id: '...', ...}
    });
    
To update an object we just need to set the `method` to "PUT".

    var todo = {
      id: '06a5254f11ff7853',
      done: true
    };

    c.request({json: todo, method: 'PUT'}, function(err, todo) {
      console.log(todo); // {id: '...', ...}
    });

Deleting an object requires an ID and the method must be set to "DELETE".

    var id = '06a5254f11ff7853';

    c.request({url: '/' + id, method: 'DELETE'}, function(err, todo) {
      console.log(err); // null - if no error occurred
    });
    
### Listening to Events

The simplest way to listen events is to use a Socket.IO client. You can find a list of clients [here](https://github.com/LearnBoost/socket.io/wiki).

Using the node.js Socket.IO client, we can create a socket by connecting to our deployed app. Then calling the socket's `on()` method to listen to a custom event emitted by a collection.

    var io = require('socket.io-client');
    var socket = io.connect('http://foo.deploydapp.com');

    socket.on('my event', function (data) {
      console.log(data); // emit()ed from the server
    });