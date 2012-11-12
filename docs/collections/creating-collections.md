<!--{
  title: 'Creating Collections',
  tags: ['guide', 'collection']
}-->

## Creating Collections

A Collection exposes a database-like API directly to clients over HTTP and WebSockets. Clients can run advanced queries, create and update objects, and listen for realtime messages to sync with the Collection when it updates. You can create a Collection in the dashboard by clicking the "Resources +" button in the sidebar, and choosing "Collection".

### Properties

Every Collection requires a set of properties that describe the data it can store. By default every object in a Collection is created with an `id`. If an object being `POST`ed or `PUT` into a Collection includes properties or values that don't match what the collection allows, they will be ignored. The following property types are available when creating a Collection:

 - `String` - Acts like a JavaScript string
 - `Number` - Stores numeric values, including floating points.
 - `Boolean` - Either true or false. (To avoid confusion, Deployd will consider null or undefined to be false)
 - `Object` - Stores any JSON object. Useful for storing arbitrary data on an object without needing to validate schema.
 - `Array` - Stores an array of any type.

### The Data Editor

Once you create a Collection from the dashboard, you can add and edit its data using the data editor. The data editor is designed to edit all sorts of data, including objects and arrays.

#### Basic Use

Double-click in a cell to start editing. Press Enter to save your changes, or Escape to cancel and undo your changes.

While editing a string property, click the "edit" icon next to the field to open up a multiline editor.

Click the trash can icon in any row to delete it.

Edit the bottom-most row to create a new object. Press Enter when editing a property to save the row, or click the checkmark in the margin.

#### Useful Shortcuts

 - Use the arrow keys to move your selection without using the mouse.
 - Press "Enter" when a cell is selected to start editing.
 - Start typing when a cell is selected to overwrite its existing value. 
 - If you accidentally save a change, press Ctrl/Cmd-Z to reverse it.
 - Press Ctrl-Delete to remove a row. Press Ctrl/Cmd-Z to add it back. (heads up: it will have a different `id`)
 - Press Ctrl-Enter to open up the multiline editor for a string property; this lets you write long text values.
 - Press Ctrl-Enter while in the multiline editor to save it (pressing Enter will just create a new line)
 - Press Tab to save the current property and edit the next one.
