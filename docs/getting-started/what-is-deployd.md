<!--{
  title: 'What is Deployd?',
  tags: ['about', 'getting started', 'introduction'],
  order: 0,
  url: 'what-is-deployd'
}-->

## What is Deployd?

Deployd is a platform that makes it easy to build and deploy APIs for mobile and web apps. APIs built on Deployd allow phones, tablets, browsers, and any other client, to query, update, and sync your apps data. Unlike working with a traditional backend, there's no boilerplate, or configuration. Deployd works right out of the box.

Deployd APIs are built from [node modules](https://npmjs.org). This means anything that can be built on [node](https://nodejs.org) can be served from Deployd. Deployd comes bundled with a set of modules called [resources](/term/resources). Resources allow you to expose common API functionality without having to start from scratch.

An example resource is a [collection](/term/collection). A collection exposes a database-like API directly to clients. All you have to do to create a [collection](/term/collection) is define its URL and the data it is able to store in Deployd's dashboard.

The dashboard is an in browser user interface that allows you to easily build and configure your APIs. Every resource has its own custom interface. For example, the collection resource includes editors for data, to edit the objects in your collection and events, to edit [event scripts](/term/events). 

Instead of leaving everything to configuration, resources expose scriptable [events](/term/events). For example, a collection exposes several events. The most commonly used being a `GET` event. In this example event script, if a user tries to `GET` a todo that the user is not the owner of, they will receive an error.

    // on GET /todos
    if(this.owner != me.id) cancel('not allowed');
    



    
