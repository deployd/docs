<!--{
  title: 'What is Deployd?',
  tags: ['about', 'getting started', 'introduction'],
  order: 0,
  url: 'what-is-deployd'
}-->

## What is Deployd?

#### Deployd is a tool that makes building APIs simple by providing important ready-made functionality out of the box that meet the demands of complex applications.

### Configuration should feel like creation

In a tool like Deployd, where its purpose is to provide ready-made functionality, a lot of configuration is necessary to make sure the end result behaves the way you need it to. We didn’t want to send users to a configuration file, though. That’s not inspiring, and it’s tedious. When you’re making an app, it should feel like you’re creating something, not just selecting values.

Some frameworks bypass this by allowing you to configure the app with code. In Deployd, you might have created your API by writing a class that inherits from a Collection base class. This is better than writing configuration files, but ultimately it leads to a lot of boilerplate code. In a Convention Over Configuration environment, when you want to use the default functionality, you write an essentially empty file. When you want to override the default functionality, you write everything from scratch.

Our solution is the Dashboard. Simply put, it’s a web-based IDE for Deployd configuration files. It’s an expressive interface that lets you create your app’s API visually.

### Logic should be code

Though we didn’t want to have our users write code for the structural setup that’s better handled in a custom interface, we realized that we can’t have users add business logic in this way. Business logic is different for every app, and we can’t account for every use case.

At the same time, we can’t force business logic out of the server-side and onto the client; that would leave your app open to attack by people who figure out your API.

We decided that there’s no better way to define logic than by writing code, so we made Deployd scriptable. By writing events, or hooks into the default functionality (such as creating objects, 

### An API Engine

We call Deployd an **API Engine** - because we think its closest relative is actually a video game engine.

A game engine assumes that every game has levels (or maps, or rooms, or scenes) which contain game objects, which need to be rendered to the screen and interact with each other. Most engines have a level editor, where you can build up these levels without any programming or code generation; when you’re finished with your level, it’s not exactly a playable game, but it works and you can walk around in a map that you built - this is the creation over configuration principle in effect.

Similarly, Deployd assumes that every API you build has [collections of data objects](/docs/collections) which need to support CRUD operations, (Create, Read, Update, Delete). Collections are created in Deployd's version of a level editor called the dashboard.

Continuing with the analogy, a game engine also knows that your game will need things like collision detection and movement, but it doesn’t know exactly how you want to implement that, so it allows you to write scripts at strategic points like “on collision” or “on tick”.  

How a rocket it is rendered to the screen is pretty consistent for any game, but what happens when that rocket hits an enemy is always different, so you write the latter behavior as a short script, and the game engine runs it at the right time. This strategy spares you from boilerplate without taking away the power and flexibility of writing custom code.

In Deployd, the low-level, redundant parts are routing and database access, so those are built into the core and you don’t have to worry about them. Business logic, which is different for every app, is scripted in [Events](/docs/collections/adding-logic.md) - hooks into the CRUD operations.

For some people, this isn’t the right approach for a final app; they prefer to have full control over the backend to tweak the performance and low-level functionality as they see fit and feel uncomfortable being limited to business logic. (Many game developers choose not to use a game engine and prefer a lower-level rendering library for virtually the same reasons) In those cases, we recommend Deployd as a prototyping tool rather than a full backend framework.

For the developers who prefer to spend their time building user interfaces, though, the scriptable engine approach is liberating. 



    
