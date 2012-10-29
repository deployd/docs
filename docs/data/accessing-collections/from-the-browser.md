## Accessing Collections - From the Browser 

This guide outlines the various ways you can access Collections from a browser.

### dpd.js

`dpd.js` is an auto-generated library that updates as you update the resources in your Deployd API. All you have to do is include a `<script src="/dpd.js"></script>` and you're browser has access to all your Deployd Collections.

#### Examples

The following examples use a Collection that was created at `/todos` and have the following schema.



### Backbone.js

### Angular.js

### jQuery

### CORS

Deployd sends all the required CORS headers by default to any domain (though this will become a setting in an upcoming version). The most common bug when implementing a CORS client for Deploy is to include headers that are not allowed. A client must not send any custom headers besides the following:


    Origin, Accept, Accept-Language, Content-Language, Content-Type, Last-Event-ID