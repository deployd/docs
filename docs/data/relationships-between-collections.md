<!--{
  title: 'Relationships Between Collections with Events',
  tags: ['guide', 'collection', 'events', 'relationships']
}-->

## Relationships Between Collections with Events

Designing the relationships between the collections in your application is crucial to a useful API. In typical databases there are very specific ways to implement the relation of objects in one table (or collection) and another. Deployd lets you relate your data however your application requires and is flexible enough to allow you to easily change the way objects are related.

### Types of Relationships

When designing the collections in your application keep in mind the following strategies for relating data. There isn't a single best way to create relationships, so you will have to take into account how data will change in your collections. 

#### Embeding Data

Deployd allows your collection to store complex structures such as nested objects or arrays. This is useful if you want to embed data inside your collection's objects. Keep in mind this is only recommended when the embeded data is not likely to change. For example, a `blog-posts` collection could have an `author` property with a type set to `Object`.

    {
      "title": "Foo Bar Bat Baz?",
      "author": {
        "name": "Joe Bob",
        "id": "5ef0f7d515764998"
      }
    }
    
This style relationship allows users of the collection to display the name of the author without running any other queries. The downside is an update event is required to keep the author name in sync if it ever changes. If your data changes often, this may not be the best approach.

#### Contains Many or One-to-Many

Similarly to storing nested objects in your collection, you can also store arrays of arbitrary JSON. This is useful when you want to setup a **contains** relationship. For example, in a gradebook application, your `classes` collection objects could **contain** `students`.

    {
      "title": "Language Arts",
      "students": ["5ef0f7d515764998", "5ef0f7d515764531", ...] 
    }
    
By storing an array of student ids you can easily query classes by student.

    dpd.classes.get({students: '5ef0f7d515764998'}, function(classes) {
      console.log(classes); // [...] - all the classes the student is in.
    });
    

#### Many-to-Many

There are several ways to handle **many-to-many** relationships. The most common way is to include an `Array` property that stores the `id`s of the related objects on both collections.

Continuing with the gradebook example, a student may have many classes, and a class may have many students. The `classes` collection would have a `students` `Array` property containing the student ids and the `students` collection would have a classes `Array` property containing class ids.

This lets you query each collection to get the students in a class or the classes a student is taking by providing the id of the class or student.

    dpd.students.get({$in: class.students}, function(students) {
      console.log(students);
    }); 
    
    // or
    
    dpd.classes.get({$in: student.classes}, function(classes) {
      console.log(classes);
    });
    
If you wanted to include the full objects when querying the API you could implement a simple `GET` event.

    // on GET /students

    var student = this;

    if(query.$include === 'classes') {
      dpd.classes.get({$in: student.classes}, function(classes) {
        student.classes = classes;
      });
    }

Then if you added the $include param when querying from the browser, a student would come back with all of its classes.

    dpd.students.get({id: '2ef0f7d515764991', $include: 'classes'}, console.log);

would output

    {
      "id": "2ef0f7d515764991",
      "name": "Joe Bob",
      "classes": [{
        "id": "...",
        "title": "Language Arts"
      }, ...]
    }
    
#### Parent-Child

Some collections contain objects related to other objects in the same collection. A simple example of this is threaded comments. Where a comment can be in reply to another comment, creating a tree-like structure when rendered.

To accomplish this, all you need is a `parent` property containing the `id` of a parent object if one exists. Since deployd supports [recursive queries](/term/recursive-queries) in a collection's `GET` event the following just works as you would expect.

    // on GET /comments
    var comment = this;

    dpd.comments.get({parent: comment.id}, function(comments) {
      if(comments && comments.length) comments.children = comments;
    });
    
Running the following query from the browser would result in a nested structure of all possible comments:

    // from the browser
    dpd.comments.get({id: '2ef0f7d515764991'}, console.log);
    
would output

    {
      "id": "2ef0f7d515764991"
      "text": "Hello, World!",
      "children": [
        {
          "id": "tef0f7d515761234",
          "text": "Foo bar...",
          "children": [
            {
              "id": "ff00f7d515764642",
              "text": "I agree!"
            },
            {
              "id": "2200f7d51576123",
              "text": "I do not agree!"
            },
          ]
        }
      ]
    }