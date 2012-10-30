<!--{
  title: 'Using dpd.js',
  tags: ['reference', 'collection', 'http', 'websockets', 'cors']
}-->

## Accessing Collections - Using dpd.js 

`dpd.js` is an auto-generated library that updates as you update the resources in your Deployd API. All you have to do is include a `<script src="/dpd.js"></script>` and your browser has access to all your Deployd Collections.

### Accessing the Collection

The API for your Collection is automatically generated as `dpd.[collectionname]`.

Examples:

    dpd.todos
    dpd.users
    dpd.todolists

**Note**: If your Collection name has a dash in it (e.g. `/todo-lists`), the dash is removed when accessing it in this way (e.g. `dpd.todolists`).

You can also access your collection by using `dpd(collectionName)` as a function.

Examples:

    dpd('todos')
    dpd('users')
    dpd('todo-lists')

**Note**: Collections accessed in this way will not have helper functions besides `get`, `post`, `put`, `del`, and `exec` (see [Accessing Custom Resources](../../extensions/accessing-custom-resources.md) for details on these generic functions)


### Collection API

The examples below use a Collection called `/todos` with the following schema:

- `id`
- string `title`
- string `category`

#### Callbacks

Every function in the Collection API takes a callback function (represented by `fn` in the docs) with the signature `function(result, error)`.

The callback will be executed asynchronously when the API has received a response from the server. You cannot call a remote API synchronously:

    // Does not work
    var result = dpd.todos.get();

<!--...-->

    // Works as expected
    dpd.todos.get(function(result, error) {
      // Work with result
    });

The `result` argument differs depending on the function. If the result failed, it will be `null` and the `error` argument will contain the error message.

The `error` argument, if there was an error, is an object:

 - `status` (number): The HTTP status code of the request. Common codes include:
  - 400 - Bad Request: The request contained invalid data and could not be completed
  - 401 - Unauthorized: The current session is not authorized to perform that action
  - 500 - Internal Server Error: Something went wrong on the server
 - `message` (string): A message describing the error. Not always present.
 - `errors` (object): A hash of error messages corresponding to the properties of the object that was sent - usually indicates validation errors. Not always present.

Examples:
  
    {
      "status": 401,
      "message": "You are not allowed to access that collection!"
    }

<!--...-->

    {
      "status": 400,
      "errors": {
          "title": "Title must be less than 100 characters",
          "category": "Not a valid category"
      }
    }

#### .get([id], [query], fn)

##### Listing Data

The `.get(fn)` function returns an array of objects in the collection.

    // Get all todos
    dpd.todos.get(function(results, error) {
      //Do something
    });

Either `results` or `error` will be available, depending on the result of the operation; the other will be null.

`results` is an array of objects: 

    [
      {
        "id": "320d6151a9aad8ce",
        "title": "Wash the dog",
        "category": "pets"
      }, {
        "id": "320d6151a9aad8ce"
        "title": "Write autobiography",
        "category": "writing"
      }
    ]

If the collection has no objects, it will be an empty array:

    []    

#### Querying Data

The `.get(query, fn)` function filters results by the specified query object. See [Querying Collections](../querying-collections.md) for information on constructing a query.

    // Get all todos that are in the pets category
    dpd.todos.get({category: 'pets'}, function(results, error) {
      // Do something
    });

`results` is an array of objects: 

    [
      {
        "id": "320d6151a9aad8ce",
        "title": "Wash the dog",
        "category": "pets"
      }
    ]

#### Getting a Specific Object

The `.get(id, fn)` function returns a single object by its `id` property.

    // Get a specific todo
    dpd.todos.get("320d6151a9aad8ce", function(result, error) {
      // Do something
    });

`result` is the object that you requested:

    {
      "id": "320d6151a9aad8ce",
      "title": "Wash the dog",
      "category": "pets"
    }

<!-- 
### Examples

The following examples use a Collection that was created at `/todos` and have the following schema.



### Backbone.js

### Angular.js

### jQuery

### CORS

Deployd sends all the required CORS headers by default to any domain (though this will become a setting in an upcoming version). The most common bug when implementing a CORS client for Deploy is to include headers that are not allowed. A client must not send any custom headers besides the following:


    Origin, Accept, Accept-Language, Content-Language, Content-Type, Last-Event-ID

-->