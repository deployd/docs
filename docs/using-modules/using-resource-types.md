<!--{
  title: 'Installing a Module',
  tags: ['resource type', 'module']
}-->

### Using a Custom Resource Type

Deployd modules can register new *Resource Types*, which can be created with a route and configured per instance. Deployd comes with two built-in Resource Types: "Collection" and "User Collection". 

To add more Resource Types, you can [install](./installing-modules) a module that includes one. The examples on this page use a simple [Route Event](https://gist.github.com/3893059) resource.

#### Creating an instance of a Custom Resource Type

Once the module is properly installed, you can add the custom resource just like a Collection. Custom Resources will usually have an asterisk <i class="icon-asterisk"></i> icon. 

![Creating a Route Event resource](/tutorials/resource-type/creating-custom-resource.png)

*Note: After adding any module, you will have to restart the Deployd server to see its effects. If you don't see the custom resource type in the list, you may have to restart the server and refresh the dashboard.*

#### Configuring a Custom Resource Type

See the documentation of your Custom Resource Type module for details on configuration options. Most custom resource types implement a "Config" page and an "Events" page.

The "Config" page can take different forms. For very basic modules, it's often a simple JSON editor where you can enter optional values. Others will list their available configuration values in a form.

The "Events" page is similar to the Collection "Events" page.

Depending on the complexity of the custom resource type, it may have different configuration pages.