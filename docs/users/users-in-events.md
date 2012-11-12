<!--{
  title: 'Accessing Users in Events',
  tags: ['guide', 'collection', 'users', 'events']
}-->

## Accessing Users in Events with "me"

In any Collection Event, the `me` object refers to the current user. You can use this to secure your app and protect your users. This page lists a few examples of how to use the `me` object effectively.

### Keeping track of an object's creator

    // On Post /todo-lists
    cancelUnless(me, "You must be logged in to create a todo list", 401);

    this.creatorId = me.id;

### Securing an object

You can ensure that only the creator of an object can update it:

    // On Put /todos
    if (!(me && me.id === this.creatorId)) {
      cancel("This is not your todo", 401);
    }

### Checking for roles

If you store an `array` of `roles` on your User Collection, you can use that to verify that the current user can perform an action:

    // On POST /blog-posts
    if (!(me && me.roles.indexOf("author") !== -1)) {
      cancel("You must be an author to create a blog post", 401);
    }

### Awarding the user points

In a gamification setup, you might want to award the user some points for creating an object:

    // On POST /answers
    if (me) {
      dpd.users.put(me.id, {
        points: {$inc: 1}
      }, function() {});
    }

    // On PUT /users
    // External APIs should not be able to edit the point value
    if (!internal) {
      protect('points');
    }
