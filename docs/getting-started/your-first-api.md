<!--{
  title: 'Your first Deployd API',
  tags: ['tutorial', 'hello world']
}-->

## Your first Deployd API

If you haven't already, [install Deployd](/docs/getting-started/installing-deployd.md).

You can create a new project by running the following commands in your terminal/command prompt (using [terminal on mac](http://smokingapples.com/software/tutorials/mac-terminal-tips/) / cmd [on windows](http://pcsupport.about.com/od/termsc/p/command-prompt.htm)).

    dpd create hello-world
    cd hello-world
    dpd -d
    
This will create your API, run Deployd, and open up your dashboard.

![Dashboard](/tutorials/first-api/images/new-dashboard.png)

Create a new collection by selecting it from the Resource **+** dropdown. In the "Create New Collection" prompt, enter `/things`.

Give your 'things' collection a property of `name` and press enter. *Note - Most screens in the dashboard have keyboard shortcuts.*

Add some data to the collection by opening up the data editor. Click the "Data" menu item under "Things". With the data editor open and the new row selected, you can just start typing a name. Type "foo", then hit enter, "bat", enter, "baz", enter.

Now you should have a data editor that looks like this.

![Dashboard](/tutorials/first-api/images/data-editor.png)

Click the "API" menu item to see documentation for accessing your collection. If you open up `http://localhost:2403/things` in a browser, you should see the following JSON:

![Dashboard](/tutorials/first-api/images/json.png)

Open up `http://localhost:2403` in your browser and pull up your console. Try the following:

    dpd.things.get(console.log);
    dpd.things.get({$limit: 1}, console.log);
    dpd.things.get({name: 'foo'}, console.log);

You should see something like the following:

![Dashboard](/tutorials/first-api/images/console.png)

### More Tutorials and Examples

 - [Your first App](/docs/getting-started/your-first-app.md)

