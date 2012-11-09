<!--{
  title: 'Creating Collections',
  tags: ['guide', 'collection']
}-->

## Creating Collections

A Collection exposes a database-like API directly to clients over HTTP and WebSockets. Clients can run advanced queries, create and update objects, and bind to change events to sync with the Collection in realtime. You can create a Collection in the dashboard.

### Properties

Every Collection requires a set of properties that describe the data it can store. By default every object in a Collection is created with an `id`. If an object being `POST`ed or `PUT` into a Collection includes properties or values that don't match what the collection allows, they will be ignored. The following property types are available when creating a Collection:

 - `String` - Acts like a JavaScript string
 - `Number` - Stores numeric values, including floating points.
 - `Boolean` - Either true or false. (To avoid confusion, Deployd will consider null or undefined to be false)
 - `Object` - Stores any JSON object. Used for storing arbitrary data on an object without needing to validate schema.
 - `Array` - Stores an array of any type.

### The Data Editor

Once you create a Collection from the dashboard, you can add and edit its data using the data editor. The data editor is designed to edit all sorts of data, including objects and arrays.

#### Useful Shortcuts 

 - Start typing in any cell to overwrite its existing value. 
 - Press Escape to undo your changes while you’re editing
 - If you accidentally save a change, press Ctrl/Cmd-Z to reverse it.
 - Press Ctrl-Delete to remove a row. Press Ctrl-Z to add it back. (heads up: it will have a different id)
 - Press Ctrl-Enter to open up the modal editor for a string property; this lets you write long text values.
 - Press Ctrl-Enter while in the modal editor to save it (pressing Enter will just create a new line)
 - Press Tab to save the current property and edit the next one.
