<!--{
  title: 'Permissions API',
  tags: ['reference', 'collection', 'permissions', 'prevent', 'allow']
}-->

## Permissions API

### allow() <!--api-->

Explicitely allow permissions that are prevented by default. Useful for allowing certain users to do batch updates and deletes for specific users.

    // Example: On Query /todos
    // if the user is logged in as an admin
    // allow batch deletes of users
    if(me && me.isAdmin) {
      allow('deleting multiple objects');
    }
    
This example would allow user's who are admins to delete multiple objects from clients.
    
### prevent() <!--api-->

Revoke permissions that may have been allowed or are allowed by default. Useful for setting broad permissions and preventing any unauthorized access or operations.

    // Example: On Validate /todos
    // unless the user is logged in
    // prevent creating an object
    if(!me) {
      prevent('creating an object');
    }

    // only allow the creator of the
    // todo to update it
    if(!isMe(this.creator)) {
      prevent('updating an object');
    }
    
### Matching Multiple Permissions

Prevent or allow multiple permissions by using the "*" wildcard permission.

    // Example: On Validate /todos
    // grant all permissions to admins
    // prevent all permissions to anyone else
    if(me && me.isAdmin) {
      allow('*');
    } else {
      prevent('*');
    }
    
### Unauthorized Access

If a user attempts an operation which is not allowed by default or has been prevented, they will recieve an error:

#### HTTP
    
    POST /todos
    {"title": "updated title"}
    
    Status Code: 401 Unauthorized
    {
      "message": "permission denied when updating multiple objects",
      "status": 401
    }
    
#### dpd.js

    dpd.todos.put({}, {title: 'foo'}, function(updated, err) {
      if(err) console.log('error:', err)
    });

    Console ~
    {
      "message": "permission denied when updating multiple objects",
      "status": 401
    }
    

### List of Collection Permissions

The following permissions can be used in `allow()` and `prevent()` in any events.

#### '*' <!--api-->

**special permission matcher**

Matches all permissions. Useful for preventing / allowing all permissions.

#### 'querying multiple objects' <!--api-->

**allowed by default**

Allows anyone to find an multiple objects by an arbitrary query.

#### 'querying an object by id' <!--api-->

**allowed by default**

Allows anyone to find a single object by id.

#### 'creating an object' <!--api-->

**allowed by default**

Allows anyone to create an object.

#### 'updating an object by id' <!--api-->

**allowed by default**

Allows anyone to update an object by id.

#### 'deleting an object by id' <!--api-->

**allowed by default**

Allows anyone to delete an object by id.
  
#### 'deleting an object by id' <!--api-->

**allowed by default**

Allows anyone to delete an object by id.

#### 'updating multiple objects' <!--api-->

**prevented by default**

Allows anyone to update objects that match an arbitrary query.

#### 'deleting multiple objects' <!--api-->

**prevented by default**

Allows anyone to delete objects that match an arbitrary query.
