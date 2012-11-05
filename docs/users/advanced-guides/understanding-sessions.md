<!--{
  title: 'Working with Sessions',
  tags: ['users', 'sessions', 'authentication']
}-->

## Working with Sessions

### Background

Since HTTP is a stateless protocol, a mechanism is required to tie independent requests and connections to a single remote **session**. In Deployd, sessions are maintained by signing each request with a session id. Currently the only mechanism for signing requests is HTTP cookies.

If a request does not contain a `sid` cookie with an existing session id, a session will be created and set as a cookie on the response.

### Sockets

WebSocket connections are identified and attached to sessions by the cookies sent during the upgrade request of a websocket.

### API

As of `v0.6` the `sessions` API is very limited. In upcoming versions the API will include the following:

- create sessions from modules
- get sockets by session or user id
- store arbitrary info on sessions
- query sessions
- *remote session api*
- query sessions by machine ip
- emit to sessions 