<!--{
  title: 'Store',
  tags: ['db', 'store', 'createStore']
}-->

## Store

An abstraction of a collection of objects in a database. Collections are HTTP wrappers around a `Store`. You can access or create a store the same way.

    var myStore = process.server.createStore('my-store');

### Class: Store

You shouldn't construct `Store`s directly. Instead use the `process.server.createStore()` method.

#### Store.insert(object, fn) <!-- api -->

* object {Object}

The data to insert into the store.

* fn(err, result) {Function}

Called once the insert operation is finished.

#### Store.count(query, fn) <!-- api -->

* query {Object}

Only count objects that match this query.

* fn(err, count) {Function}

Called once the count operation is finished. `count` is a number.

#### Store.find(query, fn) <!-- api -->

* query {Object}

Only returns objects that match this query.

* fn(err, results) {Function}

Called once the find operation is finished.

#### Store.first(query, fn) <!-- api -->

* query {Object}

* fn(err, result) {Function}

Find the first object in the store that match the given query.

#### Store.update(query, changes, fn) <!-- api -->

* query {Object}

* changes {Object}

* fn(err, updated) {Function}

Update an object or objects in the store that match the given query only modifying the values in the given changes object.

#### Store.update(query, fn) <!-- api -->

* query {Object}

* fn(err, updated) {Function}

Remove an object or objects in the store that match the given query.

#### Store.rename(name, fn) <!-- api -->

* name {String}

* fn(err) {Function}

Rename the store.


