## Collections

The most commonly used resource in a Deployd app is the Collection. It exposes a database like API that allows any client to query, modify and sync the data in your app, all without having to write a ton of boilerplate code on the server.

### Properties

Collection properties allow you to restrict what type of data a collection can store. You define them using the **property editor** in the dashboard. 

![Property Editor](/images/property-editor.png)

### Data

Collection's use JSON to store and transport your objects over the wire. Deployd comes bundled with a fully featured **data-editor** for easily managing the data in your collection.

### Events

[Control the behavior and business logic](/docs/collections/adding-logic.md) of the data in your collection by writing events. Events also allow you to easily create [relationships between collections](/docs/collections/relationships-between-collections.md).

### Notifying Clients of Changes

Deployd allows you to [send messages to the browser in real time](/docs/collections/notifying-clients.md) when a Collection is updated.
