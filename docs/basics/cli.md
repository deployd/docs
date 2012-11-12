<!--{
  title: 'The "dpd" Command Line Tool'
}-->

## Using the dpd command line tool

### Commands

#### dpd

Start Deployd the current project in development mode with an interactive shell/repl for interacting with the running server.

#### dpd create [name]
    
Create a Deployd project in a new directory with the given `name`.

#### dpd deploy [subdomain]
    
Deploy the current project to a testing instance on **deploydapp.com**. If a key does not exist, one will be generated before deploying.

#### dpd showkey
    
Print the app's key for use in a remote dashboard or for making remote authenticated / administrative requests.

#### dpd keygen
    
Generate a new key for remote access / administration.

#### dpd remote
    
Open up the remote dashboard in your browser.

### Help

Here is the help output of `dpd -h`:

    Usage: dpd [options] [command]

    Commands:

      create [project-name]
      	create a project in a new directory
      	eg. `dpd create my-app`
  
      keygen 
      	generate a key for remote access (./.dpd/keys.json)
  
      showkey 
      	shows current key for connecting to remote dashboard (./.dpd/keys.json)
  
      remote 
      	open the remote dashboard in your browser
  
      deploy [subdomain]
      	deploy a testing instance on deploydapp.com
  
      * 
      	[default] start the server in the current project in development mode
      	with an interactive shell/repl for interacting with the running server
      	e.g. dpd (starts server in current directory),
      	     dpd my-app/app.dpd (starts app from file)

    Options:

      -h, --help                   output usage information
      -V, --version                output the version number
      -m, --mongod [path]          path to mongod executable (defaults to `mongod`)
      -p, --port [port]            port to host server (defaults to 2403)
      -w, --wait                   wait for input before exiting
      -d, --dashboard              start the dashboard immediately
      -o, --open                   open in a browser
      -e, --environment [env]      defaults to development
      -H, --host [host]            specify host for mongo server
      -P, --mongoPort [mongoPort]  mongodb port to connect to
      -n, --dbname [dbname]        name of the mongo database
      -a, --auth                   prompts for mongo server credentials 
