## Creating a Custom Dashboard

When you extend a [Module](/docs/developing-modules/internal-api/module.md) or a [Resource Type](/docs/developing-modules/internal-api/resource.md), you can create a custom dashboard for it.

The default dashboard is a JSON editor for `config.json` (in the case of a Resource) or a specific module's section of `app.dpd`.

### Adding a Basic Dashboard

Deployd provides an automatically generated settings page called the "basic dashboard" that works well for most simple extensions. To add it, add a `basicDashboard` property to the `Module` or `Resource` type:

- `settings` - An array of objects describing which properties to display. 
  - `name` - The name of the property. This is how the value will be passed into the `config` object, so make sure it's something JavaScript-friendly, e.g. `maxItems`.
  - `type` - The type of control to edit this property. Allowed types are `text`, `textarea`, `number`, and `checkbox`.
  - `description` (Optional) - Explanatory text to appear below the field.
- `title` (Optional) - The title of the config page. Defaults to "Config".
- `author` (Optional) - Your name or your organization's name.
- `url` (Optional) - An absolute URL to documentation or your resource's web site.
- `image` (Optional) - An absolute URL to a 100x100 image that will appear on the page. 
- `description` (Optional) - A brief paragraph describing what your resource does

<!-- separate -->

    Resource.extend("MyResource", {
      basicDashboard: {
        title: "My Resource",
        author: "John Smith",
        url: "http://www.deployd.com",
        image: "http://placehold.it/100x100",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        settings: [{
            name: 'propertyName',
            type: 'text',
            description: "This description appears below the text field"
        }, {
            name: 'longTextProperty',
            type: 'textarea'
        }, {
            name: 'numericProperty',
            type: 'number'
        }, {
            name: 'booleanProperty',
            type: 'checkbox'
        }]
      }
    });

The above sample will produce the following dashboard page:

![Example basic dashboard](/images/basic-dashboard.png)


### Fully Customizing a Dashboard

If a basic dashboard doesn't meet your module's needs, you can create a fully customized dashboard with HTML, CSS, and JavaScript. 

To define a custom dashboard, add a `dashboard` property to your `Module` or `Resource` type.

This is a sample of how the Dashborad for the `Collection` resource is implemented:

    Resource.extend("Collection", {
      dashboard: {
          path: path.join(__dirname, 'dashboard')
        , pages: ['Properties', 'Data', 'Events', 'API']
        , scripts: [
            '/js/ui.js'
          , '/js/util.js'
        ]
      }
    });

* `path` {String}

The absolute path to this resource's dashboard assets

* `pages` {Array} *(optional)*

An array of pages to appear in the sidebar. If this is not provided, the only page available will be "Config" (and "Events", if `ResourceType.events` is set).

The dashboard will load content from `[current-page].html` and `js/[current-page].js`.

*Note: If you specify a "Config" page, it will load from `index.html` and `js/index.js`. If no `index.html` page is provided, "Config" will point to the basic dashboard.*

* `scripts` {Array} *(optional)*

An array of extra JavaScript files to load with the dashboard pages, relative to the `path`.

#### Dashboard asset loading <!-- ref -->

When you request a page from a custom dashboard, it will load the following files, if they are available, from the `dashboard.path`:

 - `[current-page].html`
 - `js/[current-page].js`
 - `style.css`

The default page is `index`; the `config` page will also redirect to `index`. 

The `config` or `index` page will load the basic dashboard if no `index.html` file is provided.
The `events` page will load the default event editor if no `events.html` file is provided.

It will also load the JavaScript files in the `dashboard.scripts` property.

#### Creating a custom dashboard

##### Event editor control <!-- ref -->

To embed the event editor in your dashboard, include this empty div:
  
    <div id="event-editor" class="default-editor"></div>

##### Styling <!-- ref -->

For styling, the dashboard uses a re-skinned version of [Twitter Bootstrap 2.0.2](http://twitter.github.com/bootstrap/). 

##### JavaScript <!-- ref -->

The dashboard provides several JavaScript libraries by default:

- [jQuery 1.7.2](http://jquery.com/)
- [jquery.cookie](https://github.com/carhartl/jquery-cookie/)
- [Underscore 1.3.3](http://underscorejs.org/)
- [Twitter Bootstrap 2.0.2](http://twitter.github.com/bootstrap/javascript.html)
- [UIKit](http://visionmedia.github.com/uikit/)
- [Ace Editor](https://github.com/ajaxorg/ace) (no-conflict version)
    - JavaScript mode
    - JSON mode
    - Custom theme for the Dashboard (`ace/theme/deployd`)
- [Google Code Prettify](http://code.google.com/p/google-code-prettify/)
- dpd.js
    - *Note:* all dpd.js requests will be sent as [root](/docs/collections/reference/http.md#s-root-requests)

Within the dashboard, a `Context` object is available:

    //Automatically generated by Deployd:
    window.Context = {
      resourceId: '/hello', // The id of the current resource
      resourceType: 'Hello', // The type of the current resource
      page: 'properties', // The current page, in multi-page dashboards
      basicDashboard: {} // The configuration of the basic dashboard
    };

You can use this to query the current resource:

    dpd(Context.resourceId).get(function(result, err) {
      //Do something
    });

In the dashboard, you also have access to the special `__resources` resource, which lets you update your app's configuration files:

    // Get the config for the current resource
    dpd('__resources').get(Context.resourceId, function(result, err) {
      //Do something
    });
    
    // Set a property for the current resource
    dpd('__resources').put(Context.resourceId, {someProperty: true}, function(result, err) {
      //Do something
    });
    
    // Set all properties for the current resource, deleting any that are not provided
    dpd('__resources').put(Context.resourceId, {someProperty: true, $setAll: true}, function(result, err) {
      //Do something
    });
    
    // Save another file, which will be loaded by the resource
    dpd('__resources').post(Context.resourceId + '/content.md', {value: "# Hello World!"}, function(result, err)) {
      //Do something
    });