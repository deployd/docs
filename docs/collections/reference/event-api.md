<!--{
  title: 'Event API',
  tags: ['reference', 'collection']
}-->

## Event API

### this <!--api-->

The current object is represented as `this`. You can always read its properties. Modifying its properties in an `On Get` request will change the result that the client recieves, while modifying its properties in an `On Post`, `On Put`, or `On Validate` will change the value in the database.

    // Example: On Validate
    // If a property is too long, truncate it
    if (this.message.length > 140) {
      this.message = this.message.substring(0, 137) + '...';
    }

*Note*: In some cases, the meaning of `this` will change to something less useful inside of a function. If you are using functions such as `Array.forEach()`, you may need to bind another variable to `this`:

    // Won't work - sum remains at 0
    this.sum = 0;
    this.targets.forEach(function(t) {
      this.sum += t.points;
    });
    
<!--seperate-->

    //Works as expected
    var self = this;

    this.sum = 0;
    this.targets.forEach(function(t) {
      self.sum += t.points;
    });

### me <!-- api -->

The currently logged in User from a User Collection. `undefined` if no user is logged in.

    // Example: On Post
    // Save the creator's information
    if (me) {
        this.creatorId = me.id;
        this.creatorName = me.name;
    }

### isMe() <!-- api --> 

    isMe(id)

Checks whether the current user matches the provided `id`.

    // Example: On Get /users
    // Hide properties unless this is the current user
    if (!isMe(this.id)) {
        hide('privateVariable');
    }

<!-- seperate -->

    // Example: On Put 
    // Make sure that only the creator can edit a post
    cancelUnless(isMe(this.id), "You are not authorized to edit that post", 401);

### query <!-- api -->

The query string object. On a specific query (such as `/posts/a59551a90be9abd8`), this includes an `id` property.

    // Example: On Get
    // Don't show the body of a post in a general query
    if (!query.id) {
      hide(this.body);
    }

### cancel() <!-- api -->

    cancel(message, [statusCode])

Stops the current request with the provided error message and HTTP status code. Status code defaults to `400`. Commonly used for security and authorization. 

It is strongly recommended that you `cancel()` any events that are not accessible to your front-end, because your API is open to anyone.

    // Example: On Post
    // Don't allow non-admins to create items
    if (!me.admin) {
      cancel("You are not authorized to do that", 401);
    }

*Note: In a GET event where multiple values are queried (such as on `/posts`), the `cancel()` function will remove the current item from the results without an error message.*

### cancelIf(), cancelUnless() <!-- api -->

    cancelIf(condition, message, [statusCode])
    cancelUnless(condition, message, [statusCode])

Calls `cancel(message, statusCode)` if the provided condition is truthy (for `cancelIf()`) or falsy (for `cancelUnless()`).

    Example: On Post
    // Prevent banned users from posting
    cancelUnless(me, "You are not logged in", 401);
    cancelIf(me.isBanned, "You are banned", 401);

### error() <!-- api -->

    error(key, message)

Adds an error message to an `errors` object in the response. Cancels the request, but continues running the event so it can collect multiple errors to display to the user. Commonly used for validation.

    // Example: On Validate
    // Don't allow certain words
    // Returns response {"errors": {"name": "Contains forbidden words"}}
    if (!this.name.match(/(foo|bar)/)) {
      error('name', "Contains forbidden words");
    }

### errorIf(), errorUnless() <!-- api -->

    errorIf(condition, key, message)
    errorUnless(condition, key, message)

Calls `error(key, message)` if the provided condition is truthy (for `errorIf()`) or falsy (for `errorUnless()`).

    // Example: On Validate
    // Require message to be a certain length
    errorUnless(this.message && this.message.length > 2, 'message', "Must be at least 2 characters");

### hide() <!-- api -->

    hide(property)

Hides a property from the response.

    // Example: On Get
    // Don't show private information
    if (!me || me.id !== this.creatorId) {
      hide('secret');
    }

### protect() <!-- api -->

    protect(property)

Prevents a property from being updated. It is strongly recommended you `protect()` any properties that should not be modified after an object is created. 

    // Example: On Put
    // Protect a property
    protect('createdDate');

<!-- seperate -->

    // Example: On Put
    // Only the creator can change the title
    if (!(me && me.id === this.creatorId)) {
      protect('title');
    }
    

### changed() <!-- api -->

    changed(property)

Returns whether a property has been updated.

    // Example: On Put
    // Validate the title when it changes
    if(changed('title') && this.title.length < 5) {
      error('title', 'must be over 5 characters');
    }
    
### previous <!-- api -->

An `Object` containing the previous values of the item to be updated.

    // Example: On Put
    if(this.votes < previous.votes) {
      emit('votes have decreased');
    }

### emit() <!-- api -->

    emit([userCollection, query], message, [data])

Emits a realtime message to the client. 

    // Example: On Post
    // Alert clients that a new post has been created
    emit('postCreated', this);

In the front end:

    // Listen for new posts
    dpd.on('postCreated', function(post) {
        //do something...
    });

You can use `userCollection` and `query` parameters to limit the message broadcast to specific users.

    // Example: On Put
    // Alert the owner that their post has been modified
    if (me.id !== this.creatorId) {
      emit(dpd.users, {id: this.creatorId}, 'postModified', this); 
    } 

See [Notifying Clients of Changes with Sockets](/docs/collections/notifying-clients.md) for an overview on realtime functionality.

### dpd <!-- ref -->

The entire [dpd.js](/docs/collections/reference/dpd-js.md) library, except for the realtime functions, is available in events. It will also properly bind `this` in callbacks.

    // Example: On Get
    // If specific query, get comments
    dpd.comments.get({postId: this.id}, function(results) {
      this.comments = results;
    });

<!--seperate-->

    // Example: On Delete
    // Log item elsewhere
    dpd.archived.post(this);

Dpd.js will prevent recursive requests if you set the [$limitRecursion](/docs/collections/reference/querying-collections.md#s-$limitRecursion) property. This works by returning `null` from a `dpd` function call that has already been called several times further up in the stack.

    // Example: On Get /recursive
    // Call self
    dpd.recursive.get({$limitRecursion: 1}, function(results) {
        if (results) this.recursive = results;
    });

<!--seperate-->

    // GET /recursive
    {
        "id": "a59551a90be9abd8",
        "recursive": [
            {
                "id": "a59551a90be9abd8"    
            }
        ]
    }


### internal <!-- api -->

Equal to true if this request has been sent by another script.

    // Example: On GET /posts
    // Posts with a parent are invisible, but are counted by their parent
    if (this.parentId && !internal) cancel();

    dpd.posts.get({parentId: this.id}, function(posts) {
        this.childPosts = posts.length;
    });

### isRoot <!-- api -->

Equal to true if this request has been authenticated as [root](/docs/collections/reference/http.md#s-Root-Requests) (has the `dpd-ssh-key` header with the appropriate key; such as from the dashboard)

    // Example: On PUT /users
    // Protect reputation property - should only be calculated by a custom script.

    if (!isRoot) protect('reputation');


### console.log() <!-- api -->

    console.log([arguments]...)

Logs the values provided to the command line. Useful for debugging.