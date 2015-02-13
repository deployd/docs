<!--{
  title: 'Using grunt or gulp with Deployd',
  tags: ['grunt', 'gulp', 'package.json']
}-->

## Using grunt or gulp with Deployd

By default, Deployd will load all npm modules found in `node_modules`. This can be problematic if you want to use Grunt, gulp or other development tools: Deployd will try to load them since they are inside the `node_modules`folder and will fail.  
To avoid that, you can add a package.json and let Deployd know which dependencies to load.


Inside `devDependencies`, you can add your grunt/gulp plugins and inside `dependencies`, add the dpd modules you need.


Example:  

    "dependencies": {
      "deployd": "^0.7.0",
      "dpd-fileupload": "^0.0.10"
    },
    "devDependencies": {
      "gulp": "^3.6.2",
      "gulp-jshint": "^1.6.1"
    }
