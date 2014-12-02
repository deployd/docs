<!--{
  title: 'Using grunt or gulp with Deployd',
  tags: ['grunt', 'gulp', 'package.json']
}-->

## Using grunt or gulp with Deployd

To use Grunt or Gulp with Deployd, you should add a package.json at the root of your project.

Inside ````devDependencies````, you can add your grunt/gulp plugins and inside dependencies, add the dpd modules you need.
Example:  

    "dependencies": {
      "deployd": "^0.7.0",
      "dpd-fileupload": "^0.0.10"
    },
    "devDependencies": {
      "gulp": "^3.6.2",
      "gulp-jshint": "^1.6.1"
    }
