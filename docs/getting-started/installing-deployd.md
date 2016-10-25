<!--{
  title: 'Installing Deployd',
  tags: ['install']
}-->

## Installing Deployd

### Requirements

- [Nodejs needs to be installed](https://nodejs.org/en/download/)
- [MongoDB community Server should be installed](https://www.mongodb.com/download-center?jmp=docs)

### Install from NPM (recommended way)

You can install Deployd as a **node module** using `npm`. Just run the following:

    npm install deployd -g
    
The `dpd` program should be available. Try `dpd -V`.

### From Source

You can download the latest source on [github](http://github.com/deployd/deployd).

    git clone https://github.com/deployd/deployd.git
    npm install
    npm link

### Mac / Windows

The macosx installer has been deprecated, please, use the npm install.

