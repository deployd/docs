<!--{
	title: 'Querying Collections',
	tags: ['reference', 'collection']
}-->

## Querying Collections

### Simple Queries

Collections can be queried over HTTP using the query string:

	GET /posts?author=Joe
	
Will return all the `posts` with an author "Joe".

### Advanced Queries

When querying a [Collection](../resources/collection.md), you can use special commands to create a more advanced query. 

Deployd supports all of [MongoDB's conditional operators](http://www.mongodb.org/display/DOCS/Advanced+Queries#AdvancedQueries-ConditionalOperators); only the common operators and Deployd's custom commands are documented here.

When using an advanced query in REST, you must pass JSON as the query string, for example:
	
	GET /posts?{"likes": {"$gt": 10}}

If you are using dpd.js, this will be handled automatically.


## Comparison ($gt, $lt, $gte, $lte) <!-- ref -->

Compares a Number property to a given value.

 - `$gt` - Greater than
 - `$lt` - Less than
 - `$gte` - Greater than or equal to
 - `$lte` - Less than or equal to

		// Finds all posts with more than 10 likes
		{
			likes: {$gt: 10}
		}

## $ne (Not Equal) <!-- ref -->

The `$ne` command lets you choose a value to exclude. 

	// Get all posts except those posted by Bob
	{
		author: {$ne: "Bob"}
	}

## $in <!-- ref -->

The `$in` command allows you to specify an array of possible matches.

	// Get articles in the "food", "business", and "technology" categories
	{
		category: {$in: ["food", "business", "technology"]}
	}

## $regex <!-- ref -->

The `$regex` command allows you to specify a [regular expression](https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Regular_Expressions) to match a string property.

You can also use the `$options` command to specify regular expression flags.

	// Get usernames that might be email addresses (x@y.z)
	{
		"username": {$regex: "[a-z0-9\-]+@[a-z0-9\-]+\.[a-z0-9\-]+", $options: 'i' }
	}

## Query commands

Query commands apply to the entire query, not just a single property.

## $fields <!-- ref -->

The `$fields` command allows you to include or exclude properties from your results.

	// Exclude the "email" property
	{
		$fields: {email: 0}
	}

<!--...-->

	// Only include the "title" property
	{
		$fields: {title: 1}
	}

## $sort <!-- ref -->

The `$sort` command allows you to order your results by the value of a property. The value can be 1 for ascending sort (lowest first; A-Z, 0-10) or -1 for descending (highest first; Z-A, 10-0)

	// Sort posts by likes, descending
	{
		$sort: {likes: -1}
	}

## $limit <!-- ref -->

The `$limit` command allows you to limit the amount of objects that are returned from a query. This is commonly used for paging, along with `$skip`.

	// Return the top 10 scores
	{
		$sort: {score: -1}
		$limit: 10
	}

## $skip <!-- ref -->

The `$skip` command allows you to exclude a given number of the first objects returned from a query. This is commonly used for paging, along with `$limit`. 

	// Return the third page of posts, with 10 posts per page
	{
		$skip: 20
		$limit: 10
	}
	
## $limitRecursion <!-- ref -->

The `$limitRecursion` command allows you to override the default recursive limits in Deployd. By default `$limitRecursion` stops a request from within a collection's `GET` event after it requests the current Collection more than 2 times. This is useful when you want to query a very deeply nested structure of data. Otherwise you can still query nested structures, but Deployd will stop the recursion after 2 levels. See the [Collection Relationships guide](relationships-between-collections.md) for more info.