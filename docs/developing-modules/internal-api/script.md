<!--{
  title: 'Event Scripts',
  tags: ['event', 'scripts']
}-->

## Event Scripts

A `Script` provides a mechanism to run JavaScript source in a sandbox. A `Script` is executed with a `Context` and a `domain` object using [the node vm module](http://nodejs.org/api/vm.html). Each `Script` runs independently. They do not share global scope or state with other scripts or modules.

### Async Mode

Scripts can be run in an **async mode**. This mode is triggered when a `Script` is `run(ctx, domain, fn)` with a callback (`fn`). When run in this mode a `Script` will try scrub all functions in the domain for operations that require a callback. If a callback is required, the function is re-written to count the callbacks completion and notify the script. When all pending callbacks are complete the script is considered finished.

### Async Errors

If a script is run with a callback (in **async mode**), any error will emit an internal `error` event. This will stop the execution of the script and pass the error to the script's callback.

### Class: Script

    var Script = require('deployd/lib/script');
    var script = new Script('hello()', 'hello.js');

A `Script`'s source is compiled when its constructor is called. It can be `run()` many times with independent `Context`s and `domain`s.

### script.run(ctx, domain, [fn]) <!-- api -->

* ctx {Context}

A `Context` with a `session`, `query`, `req` and `res`.

* domain {Object}

An `Object` containing functions to be injected into the `Script`s sandbox. This will override any existing functions or objects in the `Script`s sandbox / global scope.

This example `domain` provides a log function to a script.

    var script = new Script('log("hello world")');
    var context = {};
    var domain = {};
    var msg;

    domain.log = function(str) {
      console.log(msg = str);
    }

    script.run(ctx, domain, function(err) {
      console.log(msg); // 'hello world'
    });

* fn(err) *optional*

If a callback is provided the script will be run in **async mode**. The callback will receive any error even if the error occurs asynchronously. Otherwise it will be called without any arguments when the script is finished executing (see: async mode).

    var s = new Script('setTimeout(function() { throw "test err" }, 22)');
  
    // give the script access to setTimeout
    var domain = {setTimeout: setTimeout};
  
    s.run({}, domain, function (e) {
      console.log(e); // test err
    });
    
### Script.load(path, fn) <!-- api -->

* `path` {String}

* `fn(err, script)`

Load a new `script` at the given file `path`. Runs the callback with an error if one occurred, or a new `Script` loaded from the contents of the file.
    
### Default Domain

Scripts are executed with a default sandbox and set of domain functions. These are functions that every `Script` usually needs, and are available to every `Script`. These can be overridden by passing a value such as `{cancel: ...}` in a `domain`. See [Event API for Custom Resources](/docs/using-modules/reference/event-api.md) for documentation on this default domain.
