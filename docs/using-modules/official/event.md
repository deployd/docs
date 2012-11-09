<!--{
  title: 'Event Resource',
  tags: ['resource type', 'module'],
  description: 'Create custom events at arbitrary URLs'
}-->

## Event Resource

This custom resource type allows you to write an event when the resource's route receives a `GET` or `POST` request.

### Installation

In your app's root directory, type `npm install dpd-event` into the command line. This should create a `dpd-event` directory in your app's `node_modules` directory.

See [Installing Modules](../installing-modules.md) for details.

### Usage

The `On POST` event will be executed when the resource's route (or a subroute) receives a `POST` request, and likewise with the `On GET` event.

It is strongly recommended that you reserve the `On GET` event for operations that return a value, but don't have any side effects of modifying the database or performing some other operation.  

If your resource is called `/add-follower`, you can trigger its `POST` event from dpd.js:

    dpd.addfollower.post('320d6151a9aad8ce', {userId: '6d75e75d9bd9b8a6'}, function(result, error) {
      // Do something
    })

And over HTTP:

    POST /add-follower/320d6151a9aad8ce
    Content-Type: application/json
    {
      "userId": "6d75e75d9bd9b8a6"
    }

### Event API

In addition to the generic [custom resource event API](../reference/event-api.md), the following functions and variables are available while scripting the Event resource:


#### setResult(result) <!-- api -->

Sets the response body. The `result` argument can be a string or an object.

    // On GET /top-score
    dpd.scores.get({$limit: 1, $sort: {score: -1}, function(result) {
      setResult(result[0]);
    });

#### url <!-- api -->

The URL of the request, without the resource's base URL. If the resource is called `/add-follower` and receives a request at `/add-follower/320d6151a9aad8ce`, the `url` value will be `/320d6151a9aad8ce`.

    // On GET /statistics
    // Get the top score
    if (url === '/top-score') {
      dpd.scores.get({$limit: 1, $sort: {score: -1}, function(result) {
        setResult(result[0]);
      });
    }

#### parts <!-- api -->

An array of the parts of the url, seperated by `/`. If the resource is called `/add-follower` and receives a request at `/add-follower/320d6151a9aad8ce/6d75e75d9bd9b8a6`, the `parts` value will be `['320d6151a9aad8ce', '6d75e75d9bd9b8a6']`.

    // On POST /add-score
    // Give the specified user (/add-score/:userId) 5 points
    var userId = parts[0];
    if (!userId) cancel("You must provide a user");

    dpd.users.put({id: userId}, {score: {$inc: 5}}, function(result, err) {
      if (err) cancel(err);
    });

#### query <!-- api -->

The query string object.
  
    // On GET /sum
    // Return the sum of the a and b properties (/sum?a=5&b=1)

    setResult(query.a + query.b);

#### body <!-- api -->

The body of the request.

    // On POST /sum
    // Return the sum of the a and b properties {a: 5, b: 1}

    setResult(body.a + body.b);