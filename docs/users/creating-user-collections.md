<!--{
  title: 'Creating User Collections',
  tags: ['guide', 'collection', 'users']
}-->

## Creating User Collections

# User Collection

A User Collection extends a [Collection](/..data/creating-collections.md), adding the functionality needed to authenticate users with your app.

## Properties

User Collections can have the same properties as a Collection, with two additional non-removable properties:

- `username` - The user's identifier; must be unique.
- `password` - An encrypted password. It can never be retreived from the database, only queried against.

In addition to the above These properties can only be modified 