<!--{
  title: 'FAQ',
  layout: 'faq'
}-->

## FAQ

### Can I host Deployd on my own server?

Yes. See the [deploying to your own server](../server/deploying.md) guide for more info.

### Can I use Deployd without the JavaScript library? (e.g. for mobile apps)

Yes, you can use Deployd as a JSON API [over HTTP](../data/accessing-collections/over-http.md).

### Can I use Deployd with front-end frameworks like Backbone, AngularJS, Ember, Knockout, etc?

Yes, Deployd is unopinionated on the front-end and you can use any libraries that you like. For frameworks that provide their own AJAX implementation (particularly Backbone), you should probably use the [HTTP API](../data/accessing-collections/over-http) rather than dpd.js in most cases. Dpd.js is still useful for realtime and user authentication, as most of those frameworks don't provide any built-in way to do this.

If you're interested, some of Deployd.com (such as the community page and the documentation's search feature) was built with [AngularJS](http://angularjs.org/) and certain parts of the Dashboard (such as the data and property editor) were built with [Knockout](http://knockoutjs.com/). 

### Is Deployd anything like [Meteor](http://www.meteor.com/)?

Yes and no. Deployd is often compared to Meteor, since they are similar in several ways:

- They're both open source frameworks useful for building rich front-end web apps.
- They both simplify backend or API development.
- They both provide realtime functionality.

However, they are different in a few significant ways:

- Deployd creates APIs that can be used by web apps, mobile apps, and other web servers. Meteor, at the time of this writing, focuses exclusively on web development.
- Deployd provides a dashboard to let you define collections and manage data. Meteor simply exposes the MongoDB API. 
- Deployd is unopinionated on the front-end, letting you use whatever libraries you're familiar with; or no libraries at all. Meteor's realtime templating system unifies back-end and front-end development, but it dictates how you write your front-end code.

Deployd and Meteor solve many of the same problems in very different ways. You should try both frameworks to see which one better meets your needs.

In the future, the two frameworks may not be mutually exclusive. Deployd focuses on data management and business logic while Meteor focuses on front-end rendering in real time; it may be possible to integrate the two for the best of both worlds.

### Can I use the *X* feature of MongoDB?

    TODO