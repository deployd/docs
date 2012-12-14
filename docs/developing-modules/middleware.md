<!--{
  title: 'Defining Middleware',
  tags: ['modules', 'custom', 'extending', 'middleware']
}-->

## Defining Middleware

Deployd modules can define *middleware*, functions that will run at specific times and can add or override behavior. 

Middleware in Deployd is grouped into "stacks" of functions. Each function is called in order, receiving a `next()` callback as the last argument. When that function calls `next()`, the next function in the stack is executed. 

You can add middleware to a stack with the `addMiddleware()` function of a [module](/docs/developing-modules/internal-api/module.md).

The order of middleware can be important in some cases. By default, middleware are loaded in the order that they are defined in each module, and each module is sorted by alphabetical order.

Here's a sample middleware stack: 

    Module.extend({

      init: function() {

        this.addMiddleware('request', 'Log URL', function(ctx, next) {
          console.log("Requested " + ctx.method + " " + ctx.url);
          next();
        });

        this.addMiddleware('request', 'Render homepage', function(ctx, next) {
          if (ctx.url === '/') {
            ctx.res.end("Custom homepage");
          } else {
            next();
          }
        });

        this.addMiddleware('request', 'Increment count', function(ctx, next) {
          if (ctx.dpd.pages) { // If there's a resource called pages
            // Find a page with the current url
            ctx.dpd.pages.get({url: ctx.url}, function(pages, err) {
              if (err) return next(err);
              if (pages[0]) {
                // Increment the "views" property
                ctx.dpd.put({id: pages[0].id, views: {$inc: 1}}, function(page, err) {
                  next(err);
                });
              } else {
                next();
              }
            });
          } else {
            next();
          }
        }); 
      }
    })

These middleware functions are defined on the "request" stack, which is executed whenever the server handles an HTTP request. 

First, the "Log URL" middleware gets called. This prints some information to the console and then calls `next()`.

The "Render homepage" middleware gets called after that, which checks the current URL. If it's the root or homepage url, it calls `ctx.res.end()` to send content to the browser and does not call `next()`. This means that the rest of the middleware will not run, the server will not route to your app's resources, and the request is effectively finished. 

If the "Render homepage" middleware *did* call `next()`, though (if the URL was not the homepage), the next function ("Increment  count") will execute. This is an asynchronous operation, so `next()` has to be called in multiple places, wherever the function would stop executing. 

Finally, after the last middleware function calls `next()`, the server will finish the request normally, looking for a matching resource to handle the request. 

### Request Middleware

Deployd provides a "request" stack of middleware by default. As shown in the example above, the "request" stack is executed whenever the server handles an HTTP request, and when and if it finishes, the server will look for a resource to handle the request.

Request middleware is called with the signature `function(ctx, next)`. The `ctx` argument is a [Context](/docs/developing-modules/internal-api/context.md) object. When the middleware is finished, you must call `next()` if you do not call `ctx.done()` or `ctx.res.end()`, or the middleware will time out.

### Custom Middleware Stacks

You can create custom middleware stacks that other modules can extend using the `addMiddlewareType()` function on a module, and execute the middleware with the `server.executeMiddleware()` function.

    TODO: Example