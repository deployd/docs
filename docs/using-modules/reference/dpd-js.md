<!--{
	title: 'Dpd.js for Custom Resources',
	tags: ['dpd.js', 'custom', 'resource']
}-->

## Dpd.js for Custom Resources

Because Custom Resource Types can specify APIs very different from a Collection, Dpd.js acts as a generic HTTP library for Custom Resources.

### Accessing the Resource

The API for your Resource is automatically generated as `dpd.[resource]`.

Examples:

	dpd.emails
	dpd.addfollower
	dpd.uploads

*Note: If your Resource name has a dash in it (e.g. `/add-follower`), the dash is removed when accessing it in this way (e.g. `dpd.addfollower`).*

You can also access your resource by using `dpd(resourceName)` as a function.

Examples:

	dpd('emails')
	dpd('add-follower')
	dpd('uploads')

### Callbacks

Every function in the Dpd.js API takes a callback function (represented by `fn` in the docs) with the signature `function(result, error)`.

The callback will be executed asynchronously when the API has received a response from the server. 

The `result` argument differs depending on the function. If the result failed, it will be `null` and the `error` argument will contain the error message.

The `error` argument, if there was an error, is an object:

 - `status` (number): The HTTP status code of the request. Common codes include:
	- 400 - Bad Request: The request contained invalid data and could not be completed
	- 401 - Unauthorized: The current session is not authorized to perform that action
	- 500 - Internal Server Error: Something went wrong on the server
 - `message` (string): A message describing the error. Not always present.
 - `errors` (object): A hash of error messages corresponding to the properties of the object that was sent - usually indicates validation errors. Not always present.

Examples of errors:
	
	{
		"status": 401,
		"message": "You are not allowed to access that resource!"
	}

<!--...-->

	{
		"status": 400,
		"errors": {
			"title": "Title must be less than 100 characters",
			"category": "Not a valid category"
		}
	}


### get() <!-- api -->

	dpd.[resource].get([func], [path], [query], fn)

Makes a GET HTTP request at the URL `/<resource>/<func>/<path>`, using the `query` object as the query string if provided.

- `func` - A special identifier, i.e. `/me`.
- `path` - An identifier for a particular object, usually the id
- `query` - An object defining the querystring. If the object is complex, it will be serialized as JSON.
- `fn` - Callback `function(result, error)`.

###  post() <!-- api -->

	dpd.[resource].post([path], [query], body, fn)

Makes a POST HTTP request at the URL `/<resource>/<path>`, using the `query` object as the query string if provided and `body` as the request body.

- `path` - An identifier for a particular object, usually the id
- `query` - An object defining the querystring. If the object is complex, it will be serialized as JSON.
- `body` - The body of the request; will be serialized as JSON and sent with `Content-Type: application/json` header.
- `fn` - Callback `function(result, error)`.

### put() <!-- api -->

	dpd.[resource].put([path], [query], body, fn)

Makes a PUT HTTP request at the URL `/<resource>/<path>`, using the `query` object as the query string if provided and `body` as the request body.

- `path` - An identifier for a particular object, usually the id
- `query` - An object defining the querystring. If the object is complex, it will be serialized as JSON and passed as the `q` parameter. 
- `body` - The body of the request; will be serialized as JSON and sent with `Content-Type: application/json` header.
- `fn` - Callback `function(result, error)`.

### del() <!-- api -->

	dpd.[resource].del([path], [query], fn)

Makes a DELETE HTTP request at the URL `/<resource>/<path>`, using the `query` object as the query string if provided.

- `path` - An identifier for a particular object, usually the id
- `query` - An object defining the querystring. If the object is complex, it will be serialized as JSON and passed as the `q` parameter.
- `fn` - Callback `function(result, error)`.


### exec() <!-- api -->

	dpd.[resource].exec(func, [path], [body], fn)

Makes an RPC-style POST HTTP request at the URL `/<resource>/<func>/<path>`. Useful for functions that don't make sense in REST-style APIs, such as `/users/login`.

- `func` - The name of the function to call
- `path` - An identifier for a particular object, usually the id
- `body` - The body of the request; will be serialized as JSON and sent with `Content-Type: application/json` header.
- `fn` - Callback `function(result, error)`.

### Realtime API

The Generic Realtime API behaves the same way as the [Collection Realtime API](/docs/collections/reference/dpd-js.md#s-Realtime-API).