<!--{
  title: 'Microblogging app',
  tags: ['example', 'collection', 'users', 'dpd.js', 'angular']
}-->

## Microblogging app

This app demonstrates how to create a microblogging app (similar to Twitter) using User Collections. It also demonstrates how to use dpd.js with AngularJS on the front-end.

The app supports registering, logging in, making posts, and mentioning other users in posts with their @username.

<a href="https://github.com/downloads/deployd/examples/micro-blog.zip" class="btn btn-primary">Download</a> <a href="https://github.com/deployd/examples/tree/master/users/micro-blog" class="btn">View Source</a>

### Useful files

Events:

- [On Validate /posts](https://github.com/deployd/examples/blob/master/users/micro-blog/resources/posts/validate.js) (responsible for calculating the `mentions` property)
- [On POST /posts](https://github.com/deployd/examples/blob/master/users/micro-blog/resources/posts/post.js)

Front-end:

- [global.js](https://github.com/deployd/examples/blob/master/users/micro-blog/public/js/global.js) (The `Feed` class demonstrates paging)
- [index.js](https://github.com/deployd/examples/blob/master/users/micro-blog/public/js/index.js)