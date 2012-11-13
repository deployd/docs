<!--{
  title: 'Accessing Collections with dpd.js',
  tags: ['guide', 'collection']
}-->

## Accessing Collections with dpd.js

`dpd.js` is an auto-generated library that updates as you update the resources in your Deployd API. If you are writing your front-end in the `public` directory, include a script tag tag in your HTML:

    <script src="/dpd.js" type="text/javascript"></script>

*Note: The dpd.js file will not appear in the `public` directory because it is generated at runtime.*

### Example Usage

    dpd.todos.get(function(todos, error) {
      if (error) {
        alert(error.message);
      } else {
        for (var i = 0; i < todos.length; i++) {
          renderTodo(todos[i]);
        };
      }
    });

Dpd.js functions are *asynchronous*: they do not return a value, but execute a callback function when the AJAX operation is complete.

    // Does not work
    var result = dpd.todos.get();

<!--...-->

    // Works as expected
    dpd.todos.get(function(result, error) {
      // Work with result
    });

For details on using dpd.js, see the [dpd.js reference](/docs/collections/reference/dpd-js.md)

Also see [A Simple Todo App](/docs/collections/examples/a-simple-todo-app.md) for a working example.

### Using dpd.js on a different origin

You can use the dpd.js library outside of the `public` folder by using an absolute URL to the file. If your app is hosted at `my-app.deploydapp.com`, it would look something like this:

    <script src="http://my-app.deploydapp.com/dpd.js"></script>

This will not work on browsers that do not support Cross-Origin Resource Sharing (namely Internet Explorer 7 and below).


### Accessing Collections without Dpd.js

The dpd.js library is not required; it is only a utility library for accessing Deployd's HTTP API with AJAX. For details on the HTTP API, see the [HTTP API Refernence](/docs/collections/reference/http.md).

Some front-end libraries include support for HTTP or REST APIs; for examples of how to use these instead of dpd.js, see [A Simple Todo App with Backbone](/docs/collections/examples/a-simple-todo-app-with-backbone.md) and [A Simple Todo App with AngularJS](/docs/collections/examples/a-simple-todo-app-with-angular.md)