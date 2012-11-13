<!--{
  title: 'Session',
  tags: ['session', 'sockets', 'authenticaiton', 'auth']
}-->

## Session

An in-memory representation of a client or user connection that can be saved to disk. Data will be passed around via a [Context](/docs/developing-modules/internal-api/context.md) to resources.

### Class: Session

A store for persisting sessions inbetween connection and disconnection. Automatically creates session IDs on inserted objects.

    var session = new Session({id: 'my-sid', new SessionStore('sessions', db)});
    session.set({uid: 'my-uid'}).save();

    
* `data` {Object} 

The data used to construct the session.

* `store` {SessionStore} 

The store used to persist the session.

* `sockets` {Socket.IO.sockets} 

The Socket.IO sockets object used to attach an existing socket.

#### Session.set(changes) <!-- api -->

* `changes` {Object} 

An object containing changes to the session's data.

#### Session.save(fn) <!-- api -->

* `fn(err, data)` {Function} *optional*

Save the in memory representation of a session to its store.

#### Session.fetch(fn) <!-- api -->

* `fn(err, data)` {Function} *optional*

Reset the session using the data persisted in its store.

#### Session.remove(fn) <!-- api -->

* `fn(err, data)` {Function} *optional*

Remove the session.

#### Session.emitToAll(event, data) <!-- api -->

* `event` {String}

The event to emit to all session's sockets.

* `data` {Object} *optional*

The data to send to sockets listening to the given event.

#### Session.emitToUsers(collection, query, event, data) <!-- api -->

* `collection` {Collection}

The user-collection instance (eg. dpd.todos) to use to find users.

* `query` {Object}

Only emit the event to users that match this query.

* `event` {String}

The event to emit to all session's sockets.

* `data` {Object} *optional*

The data to send to sockets listening to the given event.