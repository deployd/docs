<!--{
  title: 'The Public Directory',
  tags: ['guide']
}-->

## The Public Directory

Deployd serves static files from your app's `/public` directory. This directory is created when you run `dpd create`. These files will be served with the appropriate cache headers (`Last-Modified` and `Etag`) so browsers will cache them.

If available, Deployd will serve `index.html` as the default file in a folder.

### Environments

When Deployd is run with the environment setting (see the documentation on the [cli](./cli.md)), it will attempt to serve files from the `/public-[environment]` directory instead. For example, if Deployd is run with `dpd -e production`, it will serve files from the `/public-production` directory.

This is useful for optimizing your app in production. You can serve a slightly different version of your front-end with minified JavaScript and CSS. You can also use it to serve compiled versions of pre-processed languages such as LESS, SASS, and CoffeeScript. 

If the environment-specific public directory does not exist, it will serve from the standard `/public` directory.