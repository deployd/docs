<!--{
  title: 'The "dpd" command line tool'
}-->

### Using the dpd command line tool.

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
