<!--{
  title: 'Session Store',
  tags: ['session', 'store', 'users']
}-->

## Session Store

Sessions are persisted in a modified store. This store has several methods to help create and manage sessions.

### Class: SessionStore

A store for persisting sessions in-between connection and disconnection. Automatically creates session IDs on inserted objects.

    var db = process.server.db;
    var sockets = process.server.sockets;
    var name = 'sessions';
    var store = new SessionStore(name, db, sockets);
    
* `name` {String} 

The name of the db store.

* `db` {Db} 

The server db instance

* `sockets` {Socket.IO.sockets} 

The socket.io `sockets` object.

#### SessionStore.createSession(sid, fn) <!-- api -->

* `sid` {String} *optional*

An existing session id.

* `fn(err, session)` {Function}

Called once the session has been created.

