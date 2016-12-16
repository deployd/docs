<!--{
  title: 'Adding Custom Business Logic with Events',
  tags: ['guide', 'collection', 'events']
}-->

## Adding Custom Business Logic with Events

Events allow you to add custom business logic to your Collection. By writing Events, you can add validation, relationships, and security to your app. Events are written in JavaScript (specifically, the ECMAScript 5 standard) and have access to the [Collection Events API](/docs/collections/reference/event-api.md).

The following events are available for scripting:

### On Get

> file: resources/{resourcename}/get.js

Called whenever an object is loaded from the server. Commonly used to hide properties, restrict access to private objects, and calculate dynamic values.

    // Example On Get: Hide Secret Properties
    if (!me || me.id !== this.creatorId) {
      hide('secret');
    }

<!--seperate-->

    // Example On Get: Load A Post's Comments
    if (query.loadComments) {
      dpd.comments.get({postId: this.id}, function(comments) {
        this.comments = comments;
      });  
    }

*Note: When a list of objects is loaded, `On Get` will run once for each object in the list. Calling `cancel()` in this case will remove the object from the list, rather than cancelling the entire request.*

### On Validate 

> file: resources/{resourcename}/validate.js

Called whenever an object's values change, including when it is first created. Commonly used to validate property values and calculate certain dynamic values (i.e. last modified time). 

    // Example On Validate: Enforce a max length
    if (this.body.length > 100) {
      error('body', "Cannot be more than 100 characters");
    }

<!--seperate-->

    // Example On Validate: Normalize an @handle
    if (this.handle.indexOf('@') !== 0) {
      this.handle = '@' + this.handle;
    }

*Note: `On Post` or `On Put` will execute after `On Validate`, unless `cancel()` or `error()` is called*


### On Post

> file: resources/{resourcename}/post.js

Called when an object is created. Commonly used to prevent unauthorized creation and save data relevant to the creation of an object, such as its creator.

    // Example On Post: Save the date created
    this.createdDate = new Date().getTime();

<!--seperate-->

    // Example On Post: Prevent unauthorized users from posting
    if (!me) {
      cancel("You must be logged in", 401);
    }


### On Put

> file: resources/{resourcename}/put.js

Called when an object is updated. Commonly used to restrict editing access to certain roles, or to protect certain properties from editing. It is strongly recommended that you `protect()` any properties that should not be modifiable by users after an object is created.

    // Example On Put: Protect readonly/automatic properties
    protect('createdDate');
    protect('creatorId');

### On Delete 

> file: resources/{resourcename}/delete.js

Called when an object is deleted. Commonly used to prevent unauthorized deletion.

    // Example On Delete: Prevent non-admins from deleting
    if (!me || me.role !== 'admin') {
      cancel("You must be an admin to delete this", 401);
    }
    
### On Before request 

> file: resources/{resourcename}/beforerequest.js

called before GET/POST/PUT/DELETE requests

### Asynchronous

> Want to look up stuff in the database, but your request finishes before your db-call returns?


* In that case, you want **async** webrequest.

By default events are **synchronous**, however they can be turned into async like so:


    var async = require("async");
    $addCallback();

    var payload = this // in case of POST/PUT

    async.each(body.storeData, function (data, done) {
      doStuffOnData(data, function (err, result) {
         done(err, result);
      );
    }, function (err){
        if (err) return cancel(err);
        $finishCallback()`; instead of `done(err,{})`
    });

> NOTE: in case of **dpd-event** events, use `setResult({})` instead of `done(err,{})`
