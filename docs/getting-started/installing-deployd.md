<!--{
  title: 'Installing Deployd',
  tags: ['install']
}-->

## Installing Deployd

### Mac

Download the latest OSX installer [here](http://deployd.com/download.html).

If everything installed correctly you should be able to open a terminal (/Applications/Utilities/Terminal.app) and type the following:

    dpd -V
  
If you see something like `0.6.8` then Deployd has been successfully installed.

#### Troubleshooting

##### "command not found"

The terminal is not able to find the `dpd` program. There are a couple things you can try:

 - restart the terminal app or open a new tab
 - add `/usr/local/deployd/bin` to your PATH ([instructions](http://www.tech-recipes.com/rx/2621/os_x_change_path_environment_variable/))
 
 
### Windows

Download the latest Windows installer [here](http://deployd.com/download.html).

To verify that Deployd installed correctly, open a command prompt (Windows-R, cmd) and type `dpd -V`. You should see a version number such as `0.6.8`.
    
#### Troubleshooting

##### "'dpd' is not recognized as an internal or external command"

Windows is unable to find the `dpd` command line tool. There are a couple of things you can try:

 - restart the command line or open a new `cmd` window
 - Add the Deployd path to your PATH variabe ([instructions](http://www.computerhope.com/issues/ch000549.htm))
  - For 64-bit systems, use the path `C:\Program Files (x86)\Deployd\bin`
  - For 32-bit systems, use the path `C:\Program Files\Deployd\bin`.

##### "'$' is not recognized as an internal or external command"

`$` is not part of the syntax for the `dpd` command; it's only used as a placeholder for the command prompt throughout the Deployd documentation. If you see something like this:

`$ dpd create my-app`

You only need to type `dpd create my-app`.
    
### From NPM

You can install Deployd as a **node module** using `npm`. Just run the following:

    npm install deployd -g
    
The `dpd` program should be available. Try `dpd -V`.

### From Source

You can download the latest source [here](http://deployd.com/download.html) or on [github](http://github.com/deployd/deployd).

    git clone https://github.com/deployd/deployd.git
    npm install
    npm link

#### Note - When installing from NPM or Source

You must have `mongod 2.0.x` and `node 0.8.x` installed and available in your PATH.