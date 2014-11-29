deployd-docs
============

documentation for the deployd platform



Workflow
---------------

    # make sure http-server is installed by (you can use your favour http server)
    # npm install -g http-server

    # start a simple http server
    http-server _site &

    # open browser and go to http://localhost:8080/


    # open another terminal
    node staticGen.js
    # change the docs files, and test the out until it is ok


    # push to git remote origin gh-pages by
    node bin/gen-gh-pages.js


Then, go to github and create a pull request to deployd/docs gh-pages branch.

Thanks
