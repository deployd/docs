<!--{
  title: 'Notifying the Client of Changes with Sockets',
  tags: ['guide', 'collection', 'sockets', 'emit']
}-->

## Notifying the Client of Changes with Sockets

Deployd allows you to send messages to the browser in real time when a Collection is updated. 


### Browser and Server Support

The realtime features of Deployd are built on [Socket.IO](http://socket.io/) and work on almost every major browser:

- Internet Explorer 5.5+
- Safari 3+
- Google Chrome 4+
- Firefox 3+
- Opera 10.61+
- iOS Safari
- Android WebKit
- WebOS WebKit

(taken from [Socket.IO's site](http://socket.io/#browser-support))

### Example

Let's say you want to make a chatroom app and you have a Collection called `/messages`. 

In the `On POST` event of `/messages`, you would add the following line:

    emit('messages:create', this);

This sends a message called `messages:create` (This could be anything) with the current object (`this`) as an argument. The `messages:` prefix namespaces the event to the collection.

On the client, you would listen for that event using `dpd.on()` and respond by updating the DOM:

    dpd.messages.on('create', function(message) {
      renderMessage(message);
    });

The `message` argument is the value you passed on the server (`this`).

See the [Chatroom Example](./examples/chatroom.md) for a working version of this code.

### Further Reading

- [Event API](./reference/event-api.md)
- [dpd.js Reference](./reference/dpd-js.md)
- [HTTP API Reference](./reference/http.md)

