<!--{
  title: 'Authenticating Users',
  tags: ['reference', 'collection', 'users']
}-->

## Authenticating Users

A User Collection can be accessed in the same ways as a Collection, both with [dpd.js](/docs/collections/accessing-collections.mdaccessing-collections.mdaccessing-collections/dpd-js.md) and [HTTP](/do/docs/collections/accessing-collections.mdessing-collections.mdaccessing-collections/http.md). It also adds new methods to the API for authentication.

The examples below use a User Collection called `/users` with the following schema:

- `id`
- `username`
- `password`
- string `displayName`

### Logging in <!--ref-->

Log in a user with their username and password. If successful, the browser will save a secure cookie for their session. This request responds with the session details:

    {
      "id": "s0446b993caaad577a..." //Session id - usually not needed
      "path": "/users" // The path of the User Collection - useful if you have different types of users.
      "uid": "ec54ad870eaca95f" //The id of the user
    }

If the username or password is incorrect, Deployd will respond with a generic error:

    {
      "status": 401,
      "message: "bad credentials"
    }

For security reasons, users should not be informed which of their credentials (username, password, or both) were incorrect.

#### dpd.js

To authenticate a user, use the `.login(credentials, fn)` function, including the `username` and `password` properties in the request body.

    dpd.users.login({
      username: "johnsmith",
      password: "password"
    }, function(result, error) {
      // Do something
    });

You can also use the `.exec('login', credentials, fn)` function. This is useful if you have accessed the collection by using `dpd()` as a function and the `login()` function is unavailable.

    dpd('users').exec('login', {
      username: "johnsmith",
      password: "password"
    }, function(result, error) {
      // Do something
    });

#### HTTP

To authenticate a user, send a `POST` request to `/login` with `username` and `password` properties in the request body.

    POST /users/login
    {
      "username": "johnsmith",
      "password": "password"
    }


### Logging out <!--ref-->

Logging out will remove the session cookie on the browser and destroy the current session. It does not return a result.

#### dpd.js

To log out a user, use the `.logout(fn)` function.

    dpd.users.logout(function(result, error) {
      // Do something
    });

`result` will always be null.

You can also use the `.exec('logout', fn)` function. This is useful if you have accessed the collection by using `dpd()` as a function and the `logout()` function is unavailable.

    dpd('users').exec('logout', function(result, error) {
      // Do something
    });

#### HTTP

To log out a user, send a `POST` request to `/logout`. Include the `sid` cookie to identify your session.

    POST /users/logout
    Cookie: sid=6009c5b070d834a2d336224a93...

The response body will always be empty unless there was an error.

### Getting the current user <!--ref-->

This will return the current user.

    {
      "id": "2975ff2778493818",
      "username": "johnsmith",
      "displayName": "John Smith"
    }

If there is no current user, it will not return a value.

#### dpd.js

To get the current user, use the `.me(fn)` function. 

    dpd.users.me(function(result, error) {
      // Do something
    });

If there is no current user, `result` will be null.

You can also use the `.get('me', fn)` function. This is useful if you have accessed the collection by using `dpd()` as a function and the `me()` function is unavailable.

    dpd('users').get('me', function(result, error) {
      // Do something
    });

#### HTTP

To get the current user, send a `GET` request to `/me`. Include the `sid` cookie to identify your session.

    GET /users/me 
    Cookie: sid=6009c5b070d834a2d336224a93...

If there is no current user, the response body will be blank:

    204 No Content