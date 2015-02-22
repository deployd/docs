window.Modules = {
  "dpd-event-extension": {
    "_id": "dpd-event-extension",
    "_rev": "6-8a1b3c9a493db3d3726af8c6213cd4ef",
    "name": "dpd-event-extension",
    "description": "Applies patch to dpd-event module to expose require function and context data",
    "dist-tags": {
      "latest": "0.0.3"
    },
    "readme": "dpd-event-extension\n===================\n\nThis module patches the Deployd dpd-event module to allow those\nwriting endpoint logic to access the require function, the process\nobject, and Deployd context data.\n\nThe require function can be used as it normally is in Node.\n\nThe process object can be used to import modules that aren't\nin the node_modules directory. For example:\n\n    var path = require('path'),\n        helpers = require(\n          path.join(process().cwd(), 'resources/aips/lib/helpers.js')\n        );\n\nThe context data, returned by calling the `context` function, can\nbe used to inspect Deployd state data.\n\nThe code is a modified version of a Gist by GitHub user Fedia:\n\nhttps://gist.github.com/Fedia/4089364\n",
    "maintainers": [
      {
        "name": "mcantelon",
        "email": "mcantelon@gmail.com"
      }
    ],
    "time": {
      "modified": "2014-02-07T22:11:05.360Z",
      "created": "2014-02-07T03:41:17.341Z",
      "0.0.1": "2014-02-07T03:41:17.341Z",
      "0.0.2": "2014-02-07T03:49:50.998Z",
      "0.0.3": "2014-02-07T22:11:05.360Z"
    },
    "readmeFilename": "README.md",
    "_attachments": {}
  },
  "dpd-search": {
    "_id": "dpd-search",
    "_rev": "2-7878db64510db5bb5748a0ec32b27b17",
    "name": "dpd-search",
    "description": "provides functionality to search a deployd collection",
    "dist-tags": {
      "latest": "0.0.2"
    },
    "readme": "ERROR: No README data found!",
    "maintainers": [
      {
        "name": "yannisgu",
        "email": "me@yannisguedel.ch"
      }
    ],
    "time": {
      "modified": "2014-01-12T17:51:38.208Z",
      "created": "2014-01-12T16:39:59.846Z",
      "0.0.1": "2014-01-12T16:39:59.846Z",
      "0.0.2": "2014-01-12T17:51:38.208Z"
    },
    "_attachments": {}
  },
  "dpd-curl-proxy": {
    "_id": "dpd-curl-proxy",
    "_rev": "4-5119c4733686ed4838b379bae5096962",
    "name": "dpd-curl-proxy",
    "description": "A cURL based proxy resource for deployd",
    "dist-tags": {
      "latest": "0.1.0"
    },
    "readme": "# dpd-curl-proxy v0.1.0\n\nCustom Deployd resource module to solve cross-domain problems by proxying requests through this resource endpoint.  Uses cURL rather than node's http module to fetch the requested url content and return it.\n\n\n\n\n",
    "maintainers": [
      {
        "name": "scottbates22",
        "email": "scott.bates@22greystreet.com"
      }
    ],
    "time": {
      "modified": "2014-04-02T23:01:32.446Z",
      "created": "2014-04-02T23:01:28.913Z",
      "0.1.0": "2014-04-02T23:01:32.446Z"
    },
    "readmeFilename": "README.md",
    "homepage": "https://github.com/UncorkedStudios/dpd-curl-proxy",
    "keywords": [
      "deployd",
      "resource",
      "proxy"
    ],
    "author": {
      "name": "Scott Bates",
      "email": "scott@uncorkedstudios.com"
    },
    "_attachments": {}
  },
  "dpd-twitter-proxy": {
    "_id": "dpd-twitter-proxy",
    "_rev": "5-bb555684344b9b7fd66fa0a676fef2f9",
    "name": "dpd-twitter-proxy",
    "description": "Twitter proxy for deployd",
    "dist-tags": {
      "latest": "0.1.1"
    },
    "readme": "# Deployd Twitter Proxy Resource\r\n\r\nThis custom resource type allows you to connect to Twitter with a local\r\nproxy that takes care of the OAuth authentication.\r\n\r\n## Installation\r\n\r\n`$ npm install dpd-twitter-proxy`\r\n\r\nSee [Installing Modules](http://docs.deployd.com/docs/using-modules/installing-modules.md) for details.\r\n\r\n## Configuration\r\n\r\nBefore using the Twitter proxy resource, you must go to its Dashboard page and configure it.\r\n\r\n### Required settings:\r\n\r\n**consumerKey**  \r\nYour Twitter Consumer Key\r\n\r\n**consumerSecret**  \r\nYour Twitter Consumer Secret\r\n",
    "maintainers": [
      {
        "name": "diadistis",
        "email": "bsotirid@gmail.com"
      }
    ],
    "time": {
      "modified": "2014-10-02T12:06:41.685Z",
      "created": "2013-11-21T18:16:16.817Z",
      "0.1.0": "2013-11-21T18:16:21.776Z",
      "0.1.1": "2014-10-02T12:06:41.685Z"
    },
    "author": {
      "name": "Diadistis",
      "email": "bsotirid@gmail.com"
    },
    "repository": {
      "type": "git",
      "url": "git://github.com/diadistis/dpd-twitter-proxy.git"
    },
    "homepage": "https://github.com/diadistis/dpd-twitter-proxy",
    "keywords": [
      "deployd",
      "resource",
      "twitter",
      "proxy"
    ],
    "contributors": {
      "name": "Laodimos",
      "email": "laodimos@gmail.com"
    },
    "bugs": {
      "url": "http://github.com/diadistis/dpd-twitter-proxy/issues"
    },
    "readmeFilename": "README.md",
    "_attachments": {}
  },
  "dpd-importer": {
    "_id": "dpd-importer",
    "_rev": "5-225a29dd3b0bbd01707bf53d567edcbe",
    "name": "dpd-importer",
    "description": "import mongo collections into your deployd app",
    "dist-tags": {
      "latest": "0.0.2"
    },
    "readme": "## dpd-importer\n\nCreate deployd collections from existing mongo collections.\n\n### usage\n\nCreate a project. Then install the dpd-importer module.\n\n    dpd create my-app\n    cd my-app\n    mkdir node_modules\n    npm install dpd-importer\n    dpd -d\n    \nClick the green new resource and choose **Importer**.\n\nGive it the default name \"/importer\". Open it by clicking \"IMPOTER\" in the left menu.\n\nEnter the information of your old MongoDB server. Clicking on **Start Import** will start creating deployd collections from data in the provided db by streaming data directly from the old db into your new deployd db.\n\n",
    "maintainers": [
      {
        "name": "ritch",
        "email": "skawful@gmail.com"
      }
    ],
    "time": {
      "modified": "2013-01-29T15:40:45.026Z",
      "created": "2012-11-17T06:14:15.779Z",
      "0.0.1": "2012-11-17T06:14:16.585Z",
      "0.0.2": "2013-01-29T15:40:45.026Z"
    },
    "author": {
      "name": "Ritchie Martori"
    },
    "repository": {
      "type": "git",
      "url": "git://github.com/deployd/dpd-importer.git"
    },
    "_attachments": {}
  },
  "dpd-s3": {
    "_id": "dpd-s3",
    "_rev": "10-fe92cbf3f0883a6689fb8fee55bbef5c",
    "name": "dpd-s3",
    "description": "get a signed Url for Put, Get file in AWS S3 in deployd",
    "dist-tags": {
      "latest": "0.3.0"
    },
    "readme": "# dpd-s3\n\n## Description\n\nget a signed Url for Put, Get file in AWS S3\n\n## Getting started\nThis module requires deployd ~0.7.0.\n\nIf you haven't used Deployd before, make sure to read the [documentation](http://docs.deployd.com/).\n\n### Installation without package.json\n````\nnpm install dpd-s3\n````\n\n### Installation with package.json\nIf you have a package.json, you'll have to add this module in it.\n````\nnpm install dpd-s3 --save\n````\nOnce it is installed, Deployd will automatically load it.  \nFor more information about Modules, take a look at [the module page on the deployd documentation](http://docs.deployd.com/docs/using-modules/).\n\n## The dpd-s3 module\n### Overview\n\nIt is a simple [aws-sdk](https://www.npmjs.org/package/aws-sdk) wrapper for deployd\n\n### Options/Settings\n\nRequire:\n- AWS Access Key\n- AWS Access Secret\n- S3 Region\n- S3 bucket\n\nPlease fill them in using the deployd dashboard config page of this module.\n\n\n### Usage example\n\n\nPut signedUrl\n```\ndpd.s3bucket.get('apple.jpg', {\n    signedUrl: 'Put'\n    ContentType: 'image/jpeg'\n}, function(signedUrl, err){\n\n    // regular http put file to signedUrl\n    $.ajax({type:'Put', url:signedUrl}, ...);\n\n})\n```\n\n\nGet signedUrl\n```\n<img src=\"/s3bucket/apple.jpg\" />\n\nOR\n\ndpd.s3bucket.get('apple.jpg', {\n    returnFormat: 'Url'\n}, function(signedUrl, err){\n    console.log(signedUrl);\n})\n```\n\n\nGet signedUrl\n```\ndpd.s3bucket.delete('apple.jpg', function(ret, err){\n    console.log(ret, err);\n})\n```\n\n\n## Contributing\n\nJust send me a Pull Request in Github.\n\n## Release history\n\n- 0.1.0: refactor to use aws-sdk and signedUrl instead of direct upload\n\n## Contributors\n\n[Eric Fong](https://github.com/ericfong)\n[cowgp](https://github.com/cowgp)\n[dallonf](https://github.com/dallonf)\n",
    "maintainers": [
      {
        "name": "scottbates22",
        "email": "scott.bates@22greystreet.com"
      },
      {
        "name": "ericfong",
        "email": "ericff@gmail.com"
      }
    ],
    "time": {
      "modified": "2015-02-12T04:02:15.393Z",
      "created": "2014-02-21T07:16:29.321Z",
      "0.1.0": "2014-02-21T07:16:30.779Z",
      "0.2.0": "2014-05-12T16:09:13.060Z",
      "0.3.0": "2015-02-12T04:02:15.393Z"
    },
    "readmeFilename": "README.md",
    "homepage": "https://github.com/deployd/dpd-s3",
    "keywords": [
      "dpd",
      "deployd",
      "dpd-module",
      "aws",
      "s3"
    ],
    "repository": {
      "type": "git",
      "url": "https://github.com/deployd/dpd-s3"
    },
    "contributors": [
      {
        "name": "cowgp",
        "url": "https://github.com/cowgp"
      },
      {
        "name": "dallonf",
        "url": "https://github.com/dallonf"
      },
      {
        "name": "Eric Fong",
        "url": "https://github.com/ericfong"
      }
    ],
    "bugs": {
      "url": "https://github.com/deployd/dpd-s3/issues"
    },
    "_attachments": {}
  },
  "dpd-image-wrangler": {
    "_id": "dpd-image-wrangler",
    "_rev": "19-fd9f4ed429312177ef6d7793250beea5",
    "name": "dpd-image-wrangler",
    "description": "Deployd module that takes an image upload via POST and makes multiple resized versions of it, then places them on an AWS s3 bucket",
    "dist-tags": {
      "latest": "0.2.3"
    },
    "readme": "# dpd-image-wrangler v0.2.3\n\nDeployd module that takes an image upload via POST and makes multiple resized versions of it, then places them on an AWS s3 bucket\n\nAllows you to customize how many and what sized versions of the uploaded image are made in the config panel of the deployd resource you setup.\n\n## Install\n\n\tnpm install dpd-image-wrangler\n\n## Configuration\n\nAdd a resource in the deployd dashboard selecting dpd-imageWrangler and name your resource. In the config for your new resource, you'll need to supply:\n\n-\tAWS Access Key\n- \tAWS Secret\n-\tAWS region\n-\tAWS S3 bucket name\n-\tResize tasks to be done when an image is uploaded (see below)\n\n*additional optional configurations:*\n\n-\tPublic read access. When files are placed on your S3 bucket, automatically flag them for public read.\n-\tbasePath.  optionally include a base url (like your Cloud Front url) to be inlcuded with the image urls in the repsonse JSON object.\n-\tInternal only.  Only allow the resource to be accessed from internal deployd requests, and not from general public requests.\n-\tImage Quality.  (Default: 95) image quality setting, range 0-100\n-\tCrop.  After scaling image to meet bounding width/height, should it center crop off the excess opposing width/height to ensure dimensions exactly match those defined for the resize task.\n\n## Setting up resize tasks\n\nYou can configure multiple resize tasks to be executed on the same resource.  The tasks configuration option expects a string representing a JSON array of objects where each object contains a desired width, height, and suffix string to be appended to the resulting filename.\n\n*example:*\n\n\t[\n\t\t{\"width\":1200, \"height\":800, \"suffix\":\"xhdpi\"},\n\t\t{\"width\":600, \"height\":400, \"suffix\":\"mdpi\"}\n\t]\n\nUnfortuantely in the current build of Deployd (0.6.X) - I haven't figured out a way to actually get the object editor seen in the data editor to pop up for a config setting.  So the resize items must get input as a colapsed JSON string like this:\n\n\t[{\"width\":600, \"height\":600, \"suffix\":\"xhdpi\"},{\"width\":300, \"height\":300, \"suffix\":\"mdpi\"}]\n\nNot as user friendly as we would like but hopefully we can get that fixed in a future update of deployd. \n\n## Making a request\n\nOnly *POST* methods are currently accepted.  Expects a multipart form style submission (relys on formidable to handle the incoming form submissions) for the file upload.  Simply make the POST request to your defined /[resource] and the resize tasks will execute on your uploaded file.\n\nMaking the POST to **/[resource]/additional-name** will place the resulting resized images into folders on your S3 bucket of whatever addition name you specify in the path you posted to.\n\n## Output\n\nIf you upload a file named *ImperialStout.jpg* to **/[resource]/beers** with the example tasks configured as above, you would end up with the following on your S3 bucket\n\n-\t/beers/ImperialStout-original.jpg\n-\t/beers/ImperialStout-mdpi.jpg\n-\t/beers/ImperialStout-xhdpi.jpg\n\nIn response to your request, a JSON object will be sent containing the resized image results as key/value pairs\n\n\t{\n\t\t\"mdpi\": \"/beers/ImperialStout-mdpi.jpg\",\n\t\t\"xhdpi\": \"/beers/ImperialStout-xhdpi.jpg\"\n\t}\n\nIf you specify your S3 bucket url or cloud front url in the config option for basePath the response would be\n\n\t{\n\t\t\"mdpi\": \"http://d111111abcdef8.cloudfront.net/beers/ImperialStout-mdpi.jpg\",\n\t\t\"xhdpi\": \"http://d111111abcdef8.cloudfront.net/beers/ImperialStout-xhdpi.jpg\"\n\t}\n\n## About the resize routine\n\nImages will be resized by attmepting a \"center cropped aspect fill\".  Meaning that the input image will be resized such that it fills the desired rectangle without distorting the image. Typically this means that one of either width or height will extend beyond the desired width/height.  The image is centered and the extra is clipped off.  \n\nThe resize is performed by the [\"gm\" node module](https://github.com/aheckmann/gm)\n\n## TODO's\n\n-\thandle multiple files uploaded within a single POST request\n\n\n",
    "maintainers": [
      {
        "name": "scottbates22",
        "email": "scott.bates@22greystreet.com"
      }
    ],
    "time": {
      "modified": "2014-04-18T19:34:13.868Z",
      "created": "2014-02-21T07:06:58.563Z",
      "0.1.0": "2014-02-21T07:07:00.196Z",
      "0.2.0": "2014-02-27T18:38:31.332Z",
      "0.2.1": "2014-02-28T20:49:09.679Z",
      "0.2.3": "2014-04-18T19:34:13.868Z"
    },
    "readmeFilename": "README.md",
    "homepage": "https://github.com/UncorkedStudios/dpd-imageWrangler",
    "users": {
      "fotoflo": true
    },
    "_attachments": {}
  },
  "dpd-forecastio": {
    "_id": "dpd-forecastio",
    "_rev": "3-bc013383e6a144a7c2237116f1150f9a",
    "name": "dpd-forecastio",
    "description": "Deployd Resource Wrapper for forecast.io weather information",
    "dist-tags": {
      "latest": "0.0.1"
    },
    "readme": "#Forecast.io Resource\n\nThis resource wraps access to the [forecast.io](https://developer.forecast.io/) weather api. The resource\nalso contains logic for caching forecast.io results to save api calls to the\nforecast.io service. \n\n##Installation\n\n`$ npm install dpd-forecastio`\n\nNeed help installing [deployd\nmodules](http://docs.deployd.com/docs/using-modules/installing-modules.md)?\n\n##Configuration Option\n\nIn the dashboard you can add the forecastio resource. You will need to configure\nthe resource and provide at minimum an API key. \n\n###Options:\n\n* `apiKey`: required to access forecast.io\n* `cacheResult`: should API calls be cached locally in mongo\n* `cacheTTL`: how long should the cached results be considered valid\n* `debugLoggin`: log debugging messages to the console. \n* `purgeCache`: will purge all cached results on any request to the resource.\n\n##Weather Data\n\nYou can make `GET` requests to the resource specifying latitude and longitude\nand you will get back forecast.io [weather\ndata](https://developer.forecast.io/docs/v2).\n\n###Example Request Using client library\n\n```javascript\ndpd.weather.get({\n  lat:42.3975734, \n  lon:-71.1332062\n}, function(data) {\n  console.log(data)\n});\n```\n\n\n\n\n",
    "maintainers": [
      {
        "name": "treasonx",
        "email": "treasonx@gmail.com"
      }
    ],
    "time": {
      "modified": "2013-05-31T22:02:27.449Z",
      "created": "2013-05-31T22:02:25.748Z",
      "0.0.1": "2013-05-31T22:02:27.449Z"
    },
    "author": {
      "name": "James Morrin"
    },
    "repository": {
      "type": "git",
      "url": "https://github.com/treasonx/dpd-forecastio"
    },
    "_attachments": {}
  },
  "dpd-email": {
    "_id": "dpd-email",
    "_rev": "8-14341270ce6a836aaa357347efe0816d",
    "name": "dpd-email",
    "description": "Module for Deployd that allows you to send an email to your users",
    "dist-tags": {
      "latest": "0.1.0"
    },
    "readme": "# Email Resource\n\nModule for Deployd that allows you to send an email to your users.\n\nThis is built on Andris Reinmans [Nodemailer](https://github.com/andris9/Nodemailer) module.\n\n## Installation\n\n`$ npm install dpd-email`\n\nSee [Installing Modules](http://docs.deployd.com/docs/using-modules/) for details.\n\n## Configuration\n\nBefore using the email resource, you must go to its Dashboard page and configure it.\n\n### Required settings:\n\n**host**  \nThe hostname of your SMTP provider.\n\n**port**  \nThe port number of your SMTP provider. Defaults to 25; 587 is also common.\n\n**ssl**  \nIf checked, use SSL to communicate with your SMTP provider.\n\n**username**  \nThe SMTP username for your app.\n\n**password**  \nThe SMTP username for your app.  \n\n### Optional settings:\n\n**defaultFromAddress**  \nA \"from\" email address to provide by default. If this is not provided, you will need to provide this address in every request.\n\n**internalOnly**  \nIf checked, only allow internal requests (such as those from events) to send emails. Recommended for security.\n\n**productionOnly**  \nIf checked, attempting to send an email in the development environment will simply print it to the Deployd console.\n\n## Usage\n\nTo send an email, call dpd.email.post(options, callback) (replacing email with your resource name). The options argument is an object:\n\n```\n{\n\n\t// The email address of the sender. Required if defaultFromAddress is not configured.\n\t// Can be plain (sender@server.com) or formatted (Sender Name <sender@server.com>)\n\tfrom : \"\",\n\n\t// Comma separated list of recipients e-mail addresses that will appear on the To: field\n\tto : \"\",\n\n\t// Comma separated list of recipients e-mail addresses that will appear on the Cc: field\n\tcc : \"\",\n\n\t// Comma separated list of recipients e-mail addresses that will appear on the Bcc: field\n\tbcc : \"\",\n\n\t// The subject of the e-mail.\n\tsubject : \"\",\n\n\t// The plaintext version of the message (can also be generated via templating)\n\ttext : \"\",\n\n\t// The HTML version of the message;\n\thtml : \"\",\n}\n```\n\n## Example Usage\n\n```\n// On POST /users\n\ndpd.email.post({\n  to      : this.email,\n  subject : 'MyApp registration',\n  text    : [\n  \tthis.username,\n  \t'',\n  \t'Thank you for registering for MyApp!'\n  ].join('\\n')\n}, function ( err, results ) {\n\t// ...\n});\n```\n\n\n## Template\n\nThis package no longer provides template feature. You can use\n\n - [https://www.npmjs.org/package/handlebars]\n - [https://www.npmjs.org/package/ejs]\n - [https://www.npmjs.org/package/lotemplate]\n\nfor render html or text before calling dpd.email.post()\n\n\n## Contributors\n\n- [View](https://github.com/deployd/dpd-email/graphs/contributors)\n",
    "maintainers": [
      {
        "name": "ritch",
        "email": "skawful@gmail.com"
      },
      {
        "name": "ericfong",
        "email": "ericff@gmail.com"
      }
    ],
    "time": {
      "modified": "2015-02-13T03:49:55.727Z",
      "created": "2012-11-14T02:03:39.479Z",
      "0.0.1": "2012-11-14T02:03:40.284Z",
      "0.0.3": "2013-03-25T14:56:48.978Z",
      "0.1.0": "2015-02-13T03:49:55.727Z"
    },
    "readmeFilename": "README.md",
    "homepage": "https://github.com/deployd/dpd-email",
    "keywords": [
      "dpd",
      "deployd",
      "dpdmodule",
      "email"
    ],
    "repository": {
      "type": "git",
      "url": "https://github.com/deployd/dpd-email.git"
    },
    "contributors": [
      {
        "name": "Wojciech Franke",
        "url": "https://github.com/enajski"
      },
      {
        "name": "Eric Fong",
        "email": "ericff@gmail.com",
        "url": "https://github.com/ericfong"
      },
      {
        "name": "Dallon Feldner",
        "url": "https://github.com/dallonf"
      },
      {
        "name": "Nicolas Ritouet",
        "url": "https://github.com/NicolasRitouet"
      },
      {
        "name": "Ritchie Martori",
        "url": "https://github.com/ritch"
      },
      {
        "name": "Jörg Ossenkopp",
        "url": "https://github.com/ozzroach"
      },
      {
        "name": "Dominik Lessel",
        "url": "https://github.com/dominiklessel"
      },
      {
        "name": "Carsten Milling",
        "email": "cmil@hashtable.de",
        "url": "https://github.com/cmil"
      }
    ],
    "bugs": {
      "url": "https://github.com/deployd/dpd-email/issues"
    },
    "_attachments": {}
  },
  "dpd-yeoman": {
    "_id": "dpd-yeoman",
    "_rev": "3-5de28a8d7e00fd4ef3c274fc04abb3e3",
    "name": "dpd-yeoman",
    "description": "A Yeoman generator to stub & scaffold deployd APIs.",
    "dist-tags": {
      "latest": "0.0.1"
    },
    "readme": "# dpd-yeoman\n\n[Deployd](http://deployd.com) API generator for yeoman.\n\n## Status\n\nActive Development\n\n## Dependencies\n\n * [MongoDB](http://mongodb.org)\n * [Node](http://nodejs.org)\n * [Yeoman](http://yeoman.io) (npm install -g yeoman)\n\n## Quick Start\n\n\tnpm install -g dpd-yeoman\n\tmkdir myapp\n\tcd myapp\n\tyeoman init angular\n\tyeoman init deployd\n\tyeoman init deployd:collection title:string description:string\n\tmongod\n\tnode server\n\tOpen localhost:3501 in your browser to see the app\n\tOpen localhost:3501/dashboard to see the deployd dashboard.\n",
    "maintainers": [
      {
        "name": "jeffbcross",
        "email": "middlefloor@gmail.com"
      }
    ],
    "time": {
      "modified": "2013-02-11T07:00:54.473Z",
      "created": "2013-02-11T07:00:53.572Z",
      "0.0.1": "2013-02-11T07:00:54.473Z"
    },
    "author": {
      "name": "Jeff Cross"
    },
    "repository": {
      "type": "git",
      "url": "https://github.com/jeffbcross/dpd-yeoman"
    },
    "_attachments": {}
  },
  "dpd-paypal-ap": {
    "_id": "dpd-paypal-ap",
    "_rev": "19-829c5085f0e7c827fd67e16bb4cea0df",
    "name": "dpd-paypal-ap",
    "description": "This custom resource type allows you to make adaptive payments through PayPal.",
    "dist-tags": {
      "latest": "0.0.9"
    },
    "readme": "dpd-paypal-ap\r\n==========================\r\n\r\nDeployd module for using a Node.js sdk for Paypal Adaptive Payments and Paypal Adaptive Accounts API, without dependencies",
    "maintainers": [
      {
        "name": "robrusher",
        "email": "rob@robrusher.com"
      }
    ],
    "time": {
      "modified": "2013-11-09T22:39:37.988Z",
      "created": "2013-08-14T04:09:52.472Z",
      "0.0.1": "2013-08-14T04:09:54.669Z",
      "0.0.2": "2013-08-14T06:17:56.639Z",
      "0.0.3": "2013-08-18T17:26:01.641Z",
      "0.0.4": "2013-09-04T18:08:41.486Z",
      "0.0.5": "2013-09-04T18:23:32.325Z",
      "0.0.6": "2013-09-04T18:46:22.521Z",
      "0.0.7": "2013-09-04T19:04:24.901Z",
      "0.0.8": "2013-09-04T19:14:45.034Z",
      "0.0.9": "2013-11-09T22:39:37.988Z"
    },
    "author": {
      "name": "Rob Rusher"
    },
    "repository": {
      "type": "git",
      "url": "https://github.com/robrusher/dpd-paypal-ap.git"
    },
    "_attachments": {}
  },
  "dpd-ses": {
    "_id": "dpd-ses",
    "_rev": "8-8df9b314d4b7275d3be0e8885dd7f349",
    "name": "dpd-ses",
    "description": "[Deployd](http://www.deployd.com) resource module for sending emails via Amazon AWS SES",
    "dist-tags": {
      "latest": "0.1.1"
    },
    "readme": "# dpd-ses v0.1.1\n\n[Deployd](http://www.deployd.com) resource module for sending emails via Amazon AWS SES\n\n## Install\n\n\tnpm install dpd-ses\n\n## Configuration\n\nAdd a resource in the deployd dashboard selecting SES and name your resource. In the config for your new resource, you'll need to supply:\n\n-\tAWS Access Key\n- \tAWS Secret\n-\tAWS region (SES is typically operating out of us-east-1 only)\n\n*additional optional configurations:*\n\n-\tDefault 'from' address.   If one is not provided you will need to provide a 'from' address in every request to the resource.\n-\tInternal only.  Only allow the resource to be accessed from internal deployd requests, and not from general public requests.\n\n*example*\n\n\tvar email = {\n        to:'someone@mail.com',\n        subject:'Check out Depolyd',\n        message:'Deployd is a really sweet node.js based platform for building API services'\n    };\n    dpd.emailShare.post(email, function(result){\n        console.log('returned from email request: '+JSON.stringify(result));\n    });\n\n## TODO's\n\n- \tAdd HTML message body support",
    "maintainers": [
      {
        "name": "scottbates22",
        "email": "scott.bates@22greystreet.com"
      }
    ],
    "time": {
      "modified": "2014-03-03T23:18:42.391Z",
      "created": "2014-02-21T07:02:28.089Z",
      "0.1.0": "2014-02-21T07:02:29.524Z",
      "0.1.1": "2014-03-03T23:18:42.391Z"
    },
    "readmeFilename": "README.md",
    "_attachments": {}
  },
  "deployd-token": {
    "_id": "deployd-token",
    "_rev": "2-0e47977abbc27444ae3fc4705c1418f4",
    "name": "deployd-token",
    "description": "modify from deployd@0.6.11,origin author is Ritchie Martori.Deployd is  the simplest way to build realtime APIs for web and mobile apps",
    "dist-tags": {},
    "readme": "# deployd-token-auth V0.0.1\n## Warning \nIt's just for tesing, i did not test in production env.\n(Reference: http://blog.auth0.com/2014/01/07/angularjs-authentication-with-cookies-vs-token/)\n\n# deployd v0.6.11\n\n[![Build Status](https://secure.travis-ci.org/deployd/deployd.png)](http://travis-ci.org/deployd/deployd)\n\n## overview\n\nDeployd is the simplest way to build realtime APIs for web and mobile apps. Ready-made, configurable Resources add common functionality to a Deployd backend, which can be further customized with JavaScript Events.\n\n[Read more about deployd](http://deployd.com)\n\n## install osx\n\n[Download](http://deployd.com/download.html) the installer.\n\n## install win\n\n[Download](http://deployd.com/download.html) the installer.\n\n## quick start\n\n\t$ dpd create hello\n\t$ cd hello\n\t$ dpd -d\n\t\n## helpful resources\n\n - [Docs](http://docs.deployd.com/)\n - [Getting Started Guide](http://docs.deployd.com/docs/getting-started/what-is-deployd.md)\n - [Hello World Tutorial](http://docs.deployd.com/docs/getting-started/your-first-api.md)\n - [API Docs](http://docs.deployd.com/api)\n - [Community Discussion Page](http://deployd.com/community.html)\n - [Example Apps](http://docs.deployd.com/examples/)\n\n## install from npm\n\n\tnpm install deployd -g\n\n## install from source\n\n\tgit clone https://github.com/deployd/deployd.git\n\tnpm install\n\tnpm link\n\n## unit tests\n\n\tcd deployd\n\tmongod &\n\tnpm test\n\n## integration tests\n\t\n\tcd test-app\n\t../bin/dpd -o\n\n## license\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n        http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n\n    Copyright 2012 deployd llc\n",
    "maintainers": [
      {
        "name": "creatorkuang",
        "email": "creatorkuang@gmail.com"
      }
    ],
    "time": {
      "modified": "2014-04-06T04:30:49.630Z",
      "created": "2014-04-06T04:16:42.865Z"
    },
    "readmeFilename": "",
    "_attachments": {}
  },
  "dpd-jobs": {
    "_id": "dpd-jobs",
    "_rev": "23-1933aba864a270c91ebaef0d133d7e77",
    "name": "dpd-jobs",
    "description": "provides functionality to create and manage scheduled jobs in a deployd app",
    "dist-tags": {
      "latest": "0.13.0"
    },
    "readme": "## dpd-jobs [![Build Status](https://travis-ci.org/yannisgu/dpd-jobs.png?branch=master)](https://travis-ci.org/yannisgu/dpd-jobs)\r\n\r\nprovides functionality to create and manage scheduled jobs in a deployd app\r\n\r\n### about\r\n\r\nThis is a **deployd module** that allows you to create and manage scheduled jobs in a deployd app. Each job is represented by a resource. You can can write custom code which will be executed regularly based on a cron-expression\r\n### usage\r\n\r\nCreate a project. Then install the dpd-jobs module.\r\n\r\n    dpd create my-app\r\n    cd my-app\r\n    mkdir node_modules\r\n    npm install dpd-jobs\r\n    dpd -d\r\n\r\nClick the green new resource and choose **Scheduled Job**.\r\n\r\nIn the config tab you can provide a cron-expression, which indicates when the code will be executed.\r\n\r\nIn the code tab you can write your code, which should be executed.\r\n\r\n### use with caution\r\n\r\nThis is alpha software. Please use with caution and report any issues or feature requests.\r\n",
    "maintainers": [
      {
        "name": "yannisgu",
        "email": "me@yannisguedel.ch"
      }
    ],
    "time": {
      "modified": "2015-02-16T08:14:14.582Z",
      "created": "2013-09-12T19:50:10.709Z",
      "0.0.1": "2013-09-12T19:50:17.274Z",
      "0.0.2": "2013-09-12T20:57:26.121Z",
      "0.0.3": "2013-09-17T13:03:29.376Z",
      "0.0.4": "2013-09-21T12:47:12.042Z",
      "0.0.5": "2013-09-21T15:24:08.396Z",
      "0.0.6": "2013-09-21T20:32:01.566Z",
      "0.0.7": "2013-09-29T13:00:27.275Z",
      "0.0.8": "2013-10-04T21:13:05.519Z",
      "0.0.10": "2014-01-11T23:15:10.308Z",
      "0.0.11": "2014-01-11T23:42:42.934Z",
      "0.0.12": "2014-11-20T10:01:23.638Z",
      "0.13.0": "2015-02-16T08:14:14.582Z"
    },
    "author": {
      "name": "Yannis Guedel"
    },
    "repository": {
      "type": "git",
      "url": "git://github.com:yannisgu/dpd-jobs.git"
    },
    "homepage": "https://github.com/yannisgu/dpd-jobs",
    "bugs": {
      "url": "https://github.com/yannisgu/dpd-jobs/issues"
    },
    "license": "MIT",
    "readmeFilename": "README.md",
    "_attachments": {}
  },
  "dpd-passport": {
    "_id": "dpd-passport",
    "_rev": "12-b8053a52706a4cad17ba2f455e5dac6a",
    "name": "dpd-passport",
    "description": "Passport for deployd",
    "dist-tags": {
      "latest": "0.1.9"
    },
    "readme": "## Auth-Passport Resource\n\nThis custom resource type allows you to authorize your users using the powerful [Passport](http://passportjs.org).\nCurrently, the following methods are supported for authentification:\n\n* **local** (i.e. username + password)\n* **Twitter** (using Api v1.1)\n* **Facebook** (using OAuth)\n* **GitHub**\n* **Google**\n\nOthers can be implemented easily if Passport supports them.\n\n### Requirements\n\n* deployd (you'd have guessed that, probably :-))\n* User-Collection named `users` with at least these custom fields:\n```json\n    {\n        \"socialAccount\": {\n            \"name\": \"socialAccount\",\n            \"type\": \"string\",\n            \"typeLabel\": \"string\",\n            \"required\": false,\n            \"id\": \"socialAccount\",\n            \"order\": 0\n        },\n        \"socialAccountId\": {\n            \"name\": \"socialAccountId\",\n            \"type\": \"string\",\n            \"typeLabel\": \"string\",\n            \"required\": false,\n            \"id\": \"socialAccountId\",\n            \"order\": 1\n        },\n        \"profile\": {\n            \"name\": \"profile\",\n            \"type\": \"object\",\n            \"typeLabel\": \"object\",\n            \"required\": false,\n            \"id\": \"profile\",\n            \"order\": 2\n        },\n        \"name\": {\n            \"name\": \"name\",\n            \"type\": \"string\",\n            \"typeLabel\": \"string\",\n            \"required\": false,\n            \"id\": \"name\",\n            \"order\": 3\n        }\n    }\n```\n\n### Installation\n\nIn your app's root directory, type `npm install dpd-passport` into the command line or [download the source](https://bitbucket.org/simpletechs/dpd-passport). This should create a `dpd-passport` directory in your app's `node_modules` directory.\n\nSee [Installing Modules](http://docs.deployd.com/docs/using-modules/installing-modules.md) for details.\n\n### Setup\n\nOpen your Dashboard and add the new Passport-Auth Resource. Then configure which modules you want to allow for your users and supply the required information for each module.\n\nNote: You may supply the baseURL (your website's root) via the environment variable `DPD_PASSPORT_BASEURL`. This is especially useful when you have a single codebase for testing + production environments.\n\n### Usage\n\nPoint your users to `/auth/{login,twitter,facebook,github,google}` to have them login (or signup) via the specified module.\nAfter that, Auth-Passport completely takes over and redirects the users according to the OAuth(2) flow.\n\n### Usage in Mobile Apps\n\nAuth-Passport was built with usage in mobile Apps in mind. From inside your mobile app, open a browser and point the user to your website's `/auth/{login,twitter,facebook,github}` endpoint. From there, Auth-Passport will take over and guide (i.e. redirect) your user through the different steps needed for each provider, until the user has authorized your app and logged in successfully.\n\nNow you can get hold of your user and his session, by specifying a `redirectURL` in the original request. After the login is done (no matter if it was successful or not), your user will be redirected to the specified URL.\nSupply some app-specific URL (see your platform's SDK on how that looks) and catch the response in your app.\nAuth-Passport will supply the following information:\n\n* **sid** (String) Session ID in deployd, send this in every subsequent request\n* **uid** (String) User ID of the user that just logged in\n* **success** (Bool) `true`, if login was successfull\n* **error** (String) contains the error message in case of an error\n\n### Development\n\nTo get started with development, please fork this repository and make your desired changes. Please note that we do all our dev work on bitbucket, so while you may submit pull requests on github, we will only push releases to github once they are finished.\n\n### Credits\n\nWe'd like to thank Passport for building this amazing auth-framework!\n\nAuth-Passport is the work of [simpleTechs.net](https://www.simpletechs.net)\n\n### Contributors\n\nThe following people contributed some of there valuable spare time to make this module even better. Please add yourself to the list, in case we forgot you.\n\n* [Tristan](https://github.com/tmcnab)",
    "maintainers": [
      {
        "name": "simpletechs",
        "email": "info+npm@simpletechs.net"
      }
    ],
    "time": {
      "modified": "2015-02-07T00:29:29.100Z",
      "created": "2014-04-09T13:08:28.998Z",
      "0.1.1": "2014-04-09T13:08:28.998Z",
      "0.1.7": "2015-02-03T21:28:43.152Z",
      "0.1.8": "2015-02-03T21:37:28.270Z",
      "0.1.9": "2015-02-07T00:29:29.100Z"
    },
    "author": {
      "name": "Fabian Off, simpleTechs.net",
      "email": "fabian@simpletechs.net"
    },
    "license": "FreeBSD",
    "readmeFilename": "Readme.md",
    "users": {},
    "keywords": [
      "deployd",
      "dpd",
      "passport",
      "login",
      "facebook",
      "github",
      "google",
      "twitter"
    ],
    "repository": {
      "type": "git",
      "url": "git@bitbucket.org:simpletechs/dpd-passport.git"
    },
    "_attachments": {}
  },
  "dpd-fileupload": {
    "_id": "dpd-fileupload",
    "_rev": "30-272503e9040a9aaf10cc6b10bb4f713b",
    "name": "dpd-fileupload",
    "description": "File uploader for Deployd",
    "dist-tags": {
      "latest": "0.0.11"
    },
    "readme": "File uploader Module for Deployd [![NPM](https://nodei.co/npm/dpd-fileupload.png?compact=true)](https://npmjs.org/package/dpd-fileupload/)\n=========================\n[A working demo is available.](https://github.com/NicolasRitouet/dpd-fileupload-demo)\n\n## Description\nThis module provides functionnality to upload files within Deployd.\nThe uploaded files will be stored in the public folder of Deployd and the filenames will be stored in a collection.\n\nDon't hesitate to [fill an issue](https://github.com/NicolasRitouet/dpd-fileupload/issues/new) if you find a bug or need a feature.\n\n## Installation\n\nGo to the base directory of your Deployd project and enter:\n\n```shell\n$ npm install dpd-fileupload --save\n```\n\nOnce installed, you can add a resource of type fileupload in the dashboard.\n![Installaton](https://raw2.github.com/NicolasRitouet/nicolasritouet.github.io/master/images/dashboard-choose-resource.png)\n\n## Configuration\nBy default, the module will create a folder called \"upload\" inside the public directory. You can then access your files by calling: http://localhost:2403/upload/filename.extension\n![Directory structure](https://raw2.github.com/NicolasRitouet/nicolasritouet.github.io/master/images/directory-structure.png)\n\nIf you need to, you can change the name of the directory in the dashboard under CONFIG.\n![Configuration](https://raw2.github.com/NicolasRitouet/nicolasritouet.github.io/master/images/dashboard-config.png)\n\n## Usage\n### Upload a file (or multiple files)\nMethod POST or PUT (set content type to \"multipart/form-data\"), send \"subdir\" as request param to save the file in a sub directory.\nAny request parameter sent will be stored in the resource object.\n\nWorking demo available here: https://github.com/NicolasRitouet/dpd-fileupload-demo\n\nResponse of a successful upload:\n```\n[{\n\tfilename: 'screenshot.png',\n    subdir: \"images\",\n    creationDate: 1389946339569,\n    id: '2f4c752310e2bbae',\n    filesize: '75148412',\n    optionalParam:'foobar'\n}, {\n\tfilename: 'screenshot (1).png',\n    subdir: \"images\",\n    creationDate: 1389946339233,\n    id: 'ef43f52310e2bbae',\n    filesize: '85412',\n    optionalParam:'foobar'\n}, ...]\n```\n\n### Get the list of files\nMethod GET\n\n```js\ndpd.fileupload.get(function(err, result) {\n    console.log(result);\n});\n```\nThe response:\n```\n[{\n\tfilename: 'screenshot.png',\n    subdir: \"images\",\n    creationDate: 1389946339569,\n    id: '2f4c752310e2bbae',\n    filesize: '75148412',\n    optionalParam:'foobar'\n}, {\n\tfilename: 'screenshot (1).png',\n    subdir: \"images\",\n    creationDate: 1389946339233,\n    id: 'ef43f52310e2bbae',\n    filesize: '8441547',\n    optionalParam:'foobar'\n}, ...]\n```\n\n### Get one file\nSince we upload the files into the /public folder, you can access your files like this:\nhttp://localhost:2403/upload/subdir/filename.extension\nreplace:\n- \"upload\" by the folder your set in the dashboard\n- \"subdir\" by the value you set for subdir. (nothing if you haven't given a subdir param)\n- \"filename.extension\" by the name of the file your uploaded\n\nIf you would like more security and some rights management to get the files, [fill an issue](https://github.com/NicolasRitouet/dpd-fileupload/issues/new) about this and I might work on this feature.\n\n\n### Remove a file from filesystem and from collection\nMethod DELETE\n\n```js\n    dpd.fileupload.delete(id, function(err, result) {\n        if (err) alert(err);\n        console.log(result);\n    });\n```\n\n\n## Changelog\n- [0.0.11](https://github.com/NicolasRitouet/dpd-fileupload/releases/tag/0.0.11)\n    - Allow internal requests for GET. Close #12\n    - Added MIME types and filtering file lists. PR #5\n- [0.0.10](https://github.com/NicolasRitouet/dpd-fileupload/releases/tag/0.0.10)\n    - Option to store unique file name (add uniqueFilename to the query param. [Cf Demo](https://github.com/NicolasRitouet/dpd-fileupload-demo/blob/master/public/js/main.js#L17))\n    - * npm update required ([MD5](https://github.com/pvorb/node-md5) dependency added)\n    - if the name of the resource is the same of the upload directory, it'll automatically append an underscore (_) to the upload directory (cf demo)\n- [0.0.9](https://github.com/NicolasRitouet/dpd-fileupload/releases/tag/0.0.9)\n    - Store file size\n- [0.0.8](https://github.com/NicolasRitouet/dpd-fileupload/releases/tag/0.0.8)\n    - any parameter send in the query will be stored in the resource (and its value will be parsed as JSON if applicable)\n    - if a parameter property name is \"subdir\", file will be placed under this subdir in the upload directory\n- [0.0.7](https://github.com/NicolasRitouet/dpd-fileupload/releases/tag/0.0.7)\n    - fix empty response issue\n- [0.0.6](https://github.com/NicolasRitouet/dpd-fileupload/releases/tag/0.0.6)\n- [0.0.5](https://github.com/NicolasRitouet/dpd-fileupload/releases/tag/0.0.5)\n\nTodo\n----\n- send an event with progress of upload\n- add tests\n- [improve demo](https://github.com/NicolasRitouet/dpd-fileupload-demo) (add implementation with angularJS, send a param in the query)\n- check if file already exist (upload anyway and put a (1) in the filename or return an error?)\n- Find a cleaner way to get the path of the upload directory\n- Implement GET of one file (stream file ?)\n",
    "maintainers": [
      {
        "name": "nicolasrtt",
        "email": "nicolas@ritouet.com"
      }
    ],
    "time": {
      "modified": "2014-07-28T20:49:36.556Z",
      "created": "2014-01-04T00:17:54.101Z",
      "0.0.1": "2014-01-04T00:17:55.093Z",
      "0.0.2": "2014-01-04T14:01:52.302Z",
      "0.0.3": "2014-01-05T21:30:07.885Z",
      "0.0.4": "2014-01-06T14:01:27.872Z",
      "0.0.5": "2014-01-07T11:52:26.957Z",
      "0.0.6": "2014-01-08T10:30:25.705Z",
      "0.0.7": "2014-01-17T07:52:41.987Z",
      "0.0.8": "2014-01-18T22:27:32.817Z",
      "0.0.9": "2014-03-12T13:39:45.357Z",
      "0.0.10": "2014-03-13T09:29:41.706Z",
      "0.0.11": "2014-07-28T20:49:36.556Z"
    },
    "author": {
      "name": "Nicolas Ritouet",
      "email": "nicolas@ritouet.com"
    },
    "repository": {
      "type": "git",
      "url": "https://github.com/NicolasRitouet/dpd-fileupload.git"
    },
    "homepage": "https://github.com/NicolasRitouet/dpd-fileupload",
    "bugs": {
      "url": "https://github.com/NicolasRitouet/dpd-fileupload/issues"
    },
    "license": "MIT",
    "readmeFilename": "README.md",
    "users": {},
    "_attachments": {}
  },
  "dpd-actions": {
    "_id": "dpd-actions",
    "_rev": "6-9c7ac8e95ab32ed5ec446cae139a2269",
    "name": "dpd-actions",
    "description": "A deployd module that allows to define custom route actions",
    "dist-tags": {
      "latest": "0.0.4"
    },
    "readme": "dpd-actions\n===========\n\n# Deployd custom route action module\n\nThis custom resource type allows you to define custom actions, to be performed outside the default collection resource, i.e., dpd-actions do not necessarily require a collection to be executed.\n\n## Installation\n\nWithin your deployd app, you can add dpd-actions using npm:\n\n`npm install dpd-actions`\n\nSee [Installing Modules](http://docs.deployd.com/docs/using-modules/installing-modules.md) for details.\n\n## Configuration\n\nGo to the deployd dashboard and add a new dpd-action. Specify a name for your action ('myactions').\nIn the actions panel add actions using the provided forms and add the code necessary to execute the action.\n\nActions can be accessed using the dpd client or http request.\n\nFor the dpd client use:\n\n`dpd.actions.myaction('actionname', callback);`\n\nFor http access:\n\n`http.get/post/put/delete('http://*my-host*:*my-port*/actions/myaction/actionname');\n\n### Settings:\n\n`resource`\n\nAllows you to specify any resource in your current setup. This resource will be directly available through the store object within your actions.\n\n### Helpers\n\nA couple of helper methods/objects will be available within a custom action:\n\n* `require`\n\nProvides access to the node [module loader](http://nodejs.org/api/modules.html)\n\n* `dpd`\n\nGives access to the internal dpd client. Allows to query other resources / collections / actions within your deployd app.\n\n* `store`\n\nDirect access to this action's `resource`'s Mongo store. Provides two accessor methods:\n\n`store.fetch`: Query the mongo store\n\n`store.persist`: Persist data into the mongo store\n\n* `this` / `data`\n\nProvides access to the requested resource and is used to provide the values returned by the request.\n",
    "maintainers": [
      {
        "name": "chunksbits",
        "email": "dan@four-downs.com"
      }
    ],
    "time": {
      "modified": "2014-08-11T06:34:36.532Z",
      "created": "2014-08-11T06:04:11.379Z",
      "0.0.2": "2014-08-11T06:04:11.379Z",
      "0.0.3": "2014-08-11T06:05:59.918Z",
      "0.0.4": "2014-08-11T06:34:36.532Z"
    },
    "homepage": "https://github.com/chunksnbits/dpd-actions",
    "repository": {
      "type": "git",
      "url": "http://github.com/chunksnbits/dpd-actions.git"
    },
    "bugs": {
      "url": "https://github.com/chunksnbits/dpd-actions/issues"
    },
    "readmeFilename": "README.md",
    "_attachments": {}
  },
  "dpd-fake-collection": {
    "_id": "dpd-fake-collection",
    "_rev": "3-cbb263d2e86f0e6887d25ebfe328b582",
    "name": "dpd-fake-collection",
    "description": "provides functionality to create a deployd resource which provides exact the same functionalty as an extisting collection, but you can/must provide other events.",
    "dist-tags": {
      "latest": "0.0.1"
    },
    "readme": "## dpd-fake-collection [![Build Status](https://travis-ci.org/yannisgu/dpd-fake-collection.png?branch=master)](https://travis-ci.org/yannisgu/dpd-fake-collection)\n\nprovides functionality to create a deployd resource which provides exact the same functionalty as an extisting collection, but you can/must provide other events.\n\n",
    "maintainers": [
      {
        "name": "yannisgu",
        "email": "me@yannisguedel.ch"
      }
    ],
    "time": {
      "modified": "2013-10-04T21:24:40.185Z",
      "created": "2013-10-04T21:24:39.315Z",
      "0.0.1": "2013-10-04T21:24:40.185Z"
    },
    "author": {
      "name": "Yannis Guedel"
    },
    "repository": {
      "type": "git",
      "url": "git://github.com:yannisgu/dpd-fake-collection.git"
    },
    "_attachments": {}
  },
  "generator-deployd": {
    "_id": "generator-deployd",
    "_rev": "11-30cb99bf077b1323fdd6d4397685b17c",
    "name": "generator-deployd",
    "description": "A yeoman generator for Deployd",
    "dist-tags": {
      "latest": "0.0.5"
    },
    "readme": "# generator-deployd [![Build Status](https://secure.travis-ci.org/NicolasRitouet/generator-deployd.png?branch=master)](https://travis-ci.org/NicolasRitouet/generator-deployd)\n\nA generator for [Yeoman](http://yeoman.io).\n\n## Notes about generator-deployd\nEarly alpha phase, use at your own risk!\n\nCurrently, it doesn't do more than \"dpd create\", but I plan to have more options with this generator (angularjs, bootstrap, Grunt tasks, etc...).\n\nYet, this only works if you [install the Deployd binaries from the deployd website](http://deployd.com/download.html), but I assure you, it's worth it!\n\n## Usage\n### Generate the app\n```\n$ npm install -g yo generator-deployd\n$ mkdir name_of_your_app && cd $_\n$ yo deployd\n```\n\n### Start the app\n```\ndpd -d\n```\n\n## Todo\n- integrate Grunt to launch the server using [grunt-deployd](https://github.com/taras/grunt-deployd)\n- integrate angularjs\n- integrate bootstrap 3\n- create grunt tasks for live reloading, jshint, build, etc...",
    "maintainers": [
      {
        "name": "nicolasrtt",
        "email": "nicolas@ritouet.com"
      }
    ],
    "time": {
      "modified": "2014-01-17T13:04:13.005Z",
      "created": "2014-01-08T21:32:57.334Z",
      "0.0.1": "2014-01-08T21:32:58.370Z",
      "0.0.2": "2014-01-09T05:55:14.774Z",
      "0.0.3": "2014-01-09T07:59:51.018Z",
      "0.0.4": "2014-01-12T21:03:13.470Z",
      "0.0.5": "2014-01-17T13:04:13.005Z"
    },
    "author": {
      "name": "Nicolas Ritouet",
      "email": "nicolas@ritouet.com",
      "url": "https://github.com/NicolasRitouet"
    },
    "repository": {
      "type": "git",
      "url": "git://github.com/NicolasRitouet/generator-deployd.git"
    },
    "_attachments": {}
  },
  "dpd-js-sdk": {
    "_id": "dpd-js-sdk",
    "_rev": "14-6e2f306167bd3140fe299e59a845323b",
    "name": "dpd-js-sdk",
    "description": "Use the deployd javascript sdk as a node module",
    "dist-tags": {
      "latest": "0.0.7"
    },
    "readme": "dpd-js-sdk\n==========\n\nUse the deployd javascript sdk (dpd.js) anywhere you can run npm modules. It's not just for the browser anymore! Use convenient dpd.js syntax to query deployd APIs using nodejs.\n\n## Install via npm\n\n```Shell\n$ npm install dpd-js-sdk\n```\n\n## Setup rootURL & baseURL (optional)\n\n```JavaScript\nvar dpd = require('dpd-js-sdk')('http://www.yourDeploydDomain.com', '/api' );\n```\n\n## Usage\n\n```JavaScript\nvar dpd = require('dpd-js-sdk')();\ndpd.todos = dpd(\"/todos\"); // you have to manually add your resources like so\n\ndpd.todos.get(function(function(results, error) {\n  //do something\n});\n```\n\nAdditional documentation for the dpd.js sdk can be found here:\nhttp://docs.deployd.com/docs/collections/reference/dpd-js.md#s-Dpd.js\n\n## How the sausage gets made:\n\nMost of this code comes straight out of https://github.com/deployd/deployd/blob/master/clib/dpd.js\n\nI have added a dependency on bluebird (for promises) and request (for sanity). Ajax requests made in the original clib/dpd.js are just replaced using promisified request.\n\nI have also removed socket.io client stuff in here for now, since I think it would take some work to get it working...and because this is enough to suit my current need. (I am using this module as part of some express middleware to get data from remote deployd API).\n\nAs such, the  Realtime API features (documented here: http://docs.deployd.com/docs/collections/reference/dpd-js.md#s-Realtime%20API) do not work.\n\n## Disclaimer\n\nThis module is untested, unauthorized, unlicenced, and unsupported. Use at your own discretion.\n",
    "maintainers": [
      {
        "name": "kimballfrank",
        "email": "kimballfrank@users.noreply.github.com"
      }
    ],
    "time": {
      "modified": "2014-09-04T19:50:50.868Z",
      "created": "2014-07-11T21:53:18.349Z",
      "0.0.1": "2014-07-11T21:53:18.349Z",
      "0.0.2": "2014-07-12T00:11:54.695Z",
      "0.0.3": "2014-08-20T21:40:08.730Z",
      "0.0.4": "2014-08-22T20:42:37.332Z",
      "0.0.5": "2014-09-04T17:46:58.540Z",
      "0.0.6": "2014-09-04T19:40:12.290Z",
      "0.0.7": "2014-09-04T19:50:50.868Z"
    },
    "homepage": "https://github.com/kimballfrank/dpd-js-sdk",
    "keywords": [
      "deployd",
      "dpd"
    ],
    "repository": {
      "type": "git",
      "url": "git://github.com/kimballfrank/dpd-js-sdk.git"
    },
    "author": {
      "name": "kimballfrank"
    },
    "bugs": {
      "url": "https://github.com/kimballfrank/dpd-js-sdk/issues"
    },
    "readmeFilename": "README.md",
    "_attachments": {}
  },
  "dpd-fb-proxy": {
    "_id": "dpd-fb-proxy",
    "_rev": "3-504e1f1df1d632437265cd72aaac573c",
    "name": "dpd-fb-proxy",
    "description": "Facebook proxy for deployd",
    "dist-tags": {
      "latest": "0.1.0"
    },
    "readme": "# Deployd Facebook Proxy Resource\r\n\r\nThis custom resource type allows you to connect to Facebook with a local\r\nproxy that takes care of the OAuth authentication.\r\n\r\n## Installation\r\n\r\n`$ npm install dpd-fb-proxy`\r\n\r\nSee [Installing Modules](http://docs.deployd.com/docs/using-modules/installing-modules.md) for details.\r\n\r\n## Configuration\r\n\r\nBefore using the FB proxy resource, you must go to its Dashboard page and configure it.\r\n\r\n### Required settings:\r\n\r\n**applicationId**  \r\nYour Facebook App ID\r\n\r\n**applicationSecret**  \r\nYour Facebook App Secret\r\n",
    "maintainers": [
      {
        "name": "diadistis",
        "email": "bsotirid@gmail.com"
      }
    ],
    "time": {
      "modified": "2013-11-21T18:04:33.720Z",
      "created": "2013-11-21T18:04:28.668Z",
      "0.1.0": "2013-11-21T18:04:33.720Z"
    },
    "author": {
      "name": "Diadistis",
      "email": "bsotirid@gmail.com"
    },
    "repository": {
      "type": "git",
      "url": "git://github.com/diadistis/dpd-fb-proxy.git"
    },
    "_attachments": {}
  },
  "dpd-beforeget": {
    "_id": "dpd-beforeget",
    "_rev": "5-bbad886a4fc2e9519d367219690e7b52",
    "name": "dpd-beforeget",
    "time": {
      "modified": "2015-02-10T15:53:29.750Z",
      "created": "2015-02-10T15:11:58.806Z",
      "1.0.0": "2015-02-10T15:11:58.806Z",
      "1.0.1": "2015-02-10T15:53:29.750Z"
    },
    "maintainers": [
      {
        "name": "docnoe",
        "email": "info@johannesnoe.com"
      }
    ],
    "dist-tags": {
      "latest": "1.0.1"
    },
    "description": "Adds \"before get\" event to Deployd collections",
    "readme": "# dpd-beforeget\nAdds a `beforeget` event to standard Deployd collections.\n\n## Why\nBy default Deployd runs the `on get` logic on each result of a get request, even if, for example, the user is not logged in and should not receive any results.\n\n### Example for standard collections\n**`ON GET` event**\n\n`cancelUnless(me, \"You are not logged in\", 401)`\n\n**Front end**\n```\ndpd.mycollection.get({}, function(res) {\n    console.log(res) // res === []\n})\n```\nThis would fetch all entries from *mycollection* and check if the user is logged in repeatedly, for **every** result.\nThen return an empty result to the user. (or crash)\n\n### With *beforeget*\n\n**`ON BEFOREGET` event**\n\n`cancelUnless(me, \"You are not logged in\", 401)`\n\n**Front end**\n```\ndpd.mycollection.get({}, function(res) {\n    console.log(res) // res === {\"message\":\"You are not logged in\",\"statusCode\":401,\"status\":401}\n})\n```\nThis time, Deployd would immediately cancel the request and return an error message to the user.\n\n",
    "homepage": "https://github.com/docnoe/dpd-beforeget",
    "keywords": [
      "deployd",
      "dpd"
    ],
    "repository": {
      "type": "git",
      "url": "git@github.com:docnoe/dpd-beforeget.git"
    },
    "author": {
      "name": "Johannes Noe",
      "email": "info@johannesnoe.com",
      "url": "https://github.com/docnoe"
    },
    "bugs": {
      "url": "https://github.com/docnoe/dpd-beforeget/issues"
    },
    "license": "Apache License Version 2.0",
    "readmeFilename": "README.md",
    "_attachments": {}
  },
  "dpd-wechat": {
    "_id": "dpd-wechat",
    "_rev": "16-5d87765d30e1658b5170268043eb1ad2",
    "name": "dpd-wechat",
    "description": "wechat for deployd",
    "dist-tags": {
      "latest": "0.1.7"
    },
    "readme": "dpd-wechat\n==========\n\nwechat on deployd\n",
    "maintainers": [
      {
        "name": "guanbo",
        "email": "guanbo2002@gmail.com"
      }
    ],
    "time": {
      "modified": "2014-06-04T03:51:06.575Z",
      "created": "2014-05-06T01:53:23.864Z",
      "0.1.0": "2014-05-06T01:53:23.864Z",
      "0.1.1": "2014-05-25T11:01:33.437Z",
      "0.1.2": "2014-05-26T09:26:27.780Z",
      "0.1.3": "2014-05-28T02:56:16.383Z",
      "0.1.4": "2014-05-28T16:07:33.207Z",
      "0.1.5": "2014-05-29T01:05:08.235Z",
      "0.1.6": "2014-05-30T01:14:26.139Z",
      "0.1.7": "2014-06-04T03:51:06.575Z"
    },
    "homepage": "https://github.com/guanbo/dpd-wechat",
    "keywords": [
      "wechat",
      "deployd",
      "dpd"
    ],
    "repository": {
      "type": "git",
      "url": "https://github.com/guanbo/dpd-wechat.git"
    },
    "author": {
      "name": "guanbo",
      "email": "guanbo2002@gmail.com",
      "url": "https://github.com/guanbo"
    },
    "bugs": {
      "url": "https://github.com/guanbo/dpd-wechat/issues"
    },
    "license": "ISC",
    "readmeFilename": "README.md",
    "_attachments": {}
  },
  "generator-nobular": {
    "_id": "generator-nobular",
    "_rev": "8-b354d61f9e34d281d9d36d744bd683be",
    "name": "generator-nobular",
    "description": "Generate an modular angular project with no-backend servers",
    "dist-tags": {
      "latest": "0.0.4"
    },
    "readme": "# generator-nobular [![Build Status](https://secure.travis-ci.org/generator-ng-multipage/generator-ng-multipage.png?branch=master)](https://travis-ci.org/generator-ng-multipage/generator-ng-multipage)\n\n> [Yeoman](http://yeoman.io) generator\n\n\n## Getting Started\n\n### What is Yeoman?\n\nTrick question. It's not a thing. It's this guy:\n\nBasically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.\n\nNot every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*\n\n```bash\nnpm install -g yo\n```\n\n### Yeoman Generators\n\nYeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.\n\nTo install generator-ng-multipage from npm, run:\n\n```bash\nnpm install -g generator-ng-multipage\n```\n\nFinally, initiate the generator:\n\n```bash\nyo ng-multipage\n```\n\n### Getting To Know Yeoman\n\nYeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.\n\nIf you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).\n\n\n## License\n\nMIT\n",
    "maintainers": [
      {
        "name": "saadfarooq",
        "email": "sa@dfarooq.com"
      }
    ],
    "time": {
      "modified": "2015-01-27T08:06:35.711Z",
      "created": "2015-01-11T18:12:05.681Z",
      "0.0.1": "2015-01-11T18:12:05.681Z",
      "0.0.2": "2015-01-15T15:07:56.772Z",
      "0.0.3": "2015-01-23T02:16:46.129Z",
      "0.0.4": "2015-01-27T08:06:35.711Z"
    },
    "homepage": "https://github.com/saadfarooq/generator-nobular",
    "keywords": [
      "yeoman-generator",
      "framework",
      "component",
      "front-end",
      "app",
      "angular",
      "no-backend",
      "firebase",
      "deployd"
    ],
    "repository": {
      "type": "git",
      "url": "https://github.com/saadfarooq/generator-nobular"
    },
    "author": {
      "name": "Saad Farooq",
      "email": "sa@dfarooq.com",
      "url": "http://saa.dfarooq.com"
    },
    "bugs": {
      "url": "https://github.com/saadfarooq/generator-nobular/issues"
    },
    "license": "MIT",
    "readmeFilename": "README.md",
    "_attachments": {}
  },
  "dpd-pdf": {
    "_id": "dpd-pdf",
    "_rev": "3-c5f35419746d733d1f5200f1c958c541",
    "name": "dpd-pdf",
    "description": "PDF rendering resource for Deployd.",
    "dist-tags": {
      "latest": "0.1.0"
    },
    "readme": "# Deployd PDF Rendering Resource\r\n\r\nThis custom resource type allows you to render html to PDF. It requires an\r\nexternal command line utility like [wkhtml](https://code.google.com/p/wkhtmltopdf/).\r\n\r\n## Installation\r\n\r\n`$ npm install dpd-pdf`\r\n\r\nSee [Installing Modules](http://docs.deployd.com/docs/using-modules/installing-modules.md) for details.\r\n\r\n## Configuration\r\n\r\nBefore using the pdf resource, you must go to its Dashboard page and configure it.\r\n\r\n### Required settings:\r\n\r\n**path**  \r\nFull path to PDF renderer executable.\r\n\r\n### Optional settings:\r\n\r\n**options**  \r\nPDF renderer command line options.\r\n",
    "maintainers": [
      {
        "name": "diadistis",
        "email": "bsotirid@gmail.com"
      }
    ],
    "time": {
      "modified": "2013-11-14T17:00:51.095Z",
      "created": "2013-11-14T17:00:46.261Z",
      "0.1.0": "2013-11-14T17:00:51.095Z"
    },
    "author": {
      "name": "Diadistis",
      "email": "bsotirid@gmail.com"
    },
    "repository": {
      "type": "git",
      "url": "git://github.com/diadistis/dpd-pdf.git"
    },
    "_attachments": {}
  },
  "grunt-dpdjs": {
    "_id": "grunt-dpdjs",
    "_rev": "4-d57fb1c59be65dcac530a94166920d42",
    "name": "grunt-dpdjs",
    "description": "Generate local dpd.js file.",
    "dist-tags": {
      "latest": "0.1.1"
    },
    "readme": "# grunt-dpdjs\n\nThis task generate local dpd.js file for deployd.\n\n## Getting Started\nThis plugin requires Grunt `>= 0.4.0`\n\nIf you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:\n\n```shell\nnpm install grunt-dpdjs --save-dev\n```\n\nOnce the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:\n\n```js\ngrunt.loadNpmTasks('grunt-dpdjs');\n```\n\n## The \"dpdjs\" task\n\n### Overview\nIn your project's Gruntfile, add a section named `dpdjs` to the data object passed into `grunt.initConfig()`.\n\n```js\ngrunt.initConfig({\n  dpdjs: {\n    options: {\n        serverPath: './',\n        dest: 'tmp/dpd.js'\n    }\n  },\n});\n```\n\n### Options\n\n#### options.serverPath\nType: `String`\nDefault value: `'./'`\n\nBase path for find `resources` dir.\n\n#### options.dest\nType: `String`\nDefault value: `'public/js/dpd.js'`\n\nA Path to distribute dpd.js.\n\n\n## Contributing\nIn lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).\n",
    "maintainers": [
      {
        "name": "kechol",
        "email": "tmp@kechol.net"
      }
    ],
    "time": {
      "modified": "2014-07-13T17:58:34.885Z",
      "created": "2014-07-13T17:49:40.944Z",
      "0.1.0": "2014-07-13T17:49:40.944Z",
      "0.1.1": "2014-07-13T17:58:34.885Z"
    },
    "homepage": "https://github.com/Kechol/grunt-dpdjs",
    "keywords": [
      "gruntplugin",
      "deployd",
      "dpd"
    ],
    "repository": {
      "type": "git",
      "url": "git://github.com/Kechol/grunt-dpdjs.git"
    },
    "author": {
      "name": "Kazuyuki SUZUKI",
      "url": "http://kechol.net/"
    },
    "bugs": {
      "url": "https://github.com/Kechol/grunt-dpdjs/issues"
    },
    "readmeFilename": "README.md",
    "_attachments": {}
  },
  "dpd-notify": {
    "_id": "dpd-notify",
    "_rev": "7-cfa75c37e24d87aa961ee5879f84e2ba",
    "name": "dpd-notify",
    "description": "send android push notification in deployd",
    "dist-tags": {
      "latest": "1.0.2"
    },
    "readme": "# dpd-notify\n\n## Description\n\nSend android push notification in deployd\n\n\n## Getting started\nThis module requires deployd ~0.7.0.\n\nIf you haven't used Deployd before, make sure to read the [documentation](http://docs.deployd.com/).\n\n### Installation without package.json\n````\nnpm install dpd-notify\n````\n\n### Installation with package.json\nIf you have a package.json, you'll have to add this module in it.\n````\nnpm install dpd-notify --save\n````\nOnce it is installed, Deployd will automatically load it.  \nFor more information about Modules, take a look at [the module page on the deployd documentation](http://docs.deployd.com/docs/using-modules/).\n\n## The dpd-notify module\n### Overview\n\nIt is a simple [node-gcm](https://www.npmjs.org/package/node-gcm) wrapper for deployd\n\n### Options/Settings\n\nRequire:\n- gcmSender\n\nPlease fill them in using the deployd dashboard config page of this module.\n\n\n### Usage example\n\n// send push notification to android phone\ndpd.notify.post( { gcmIds:['GCM_ID'], title:'Title', message:'Message' } );\n\n\n## Contributing\n\nJust send me a Pull Request in Github.\n\n\n## Release history\n\n- 1.0.0: first version\n\n\n## Contributors\n\n[Eric Fong](https://github.com/ericfong)\n",
    "maintainers": [
      {
        "name": "ericfong",
        "email": "ericff@gmail.com"
      }
    ],
    "time": {
      "modified": "2014-12-11T16:17:20.386Z",
      "created": "2014-11-26T05:06:56.995Z",
      "1.0.0": "2014-11-26T05:06:56.995Z",
      "1.0.1": "2014-11-26T05:12:14.371Z",
      "1.0.2": "2014-12-11T16:17:20.386Z"
    },
    "homepage": "https://github.com/ericfong/dpd-notify",
    "keywords": [
      "dpdmodule",
      "dpd",
      "deployd",
      "notify",
      "gcm",
      "android",
      "push",
      "notification"
    ],
    "repository": {
      "type": "git",
      "url": "https://github.com/ericfong/dpd-twilio"
    },
    "author": {
      "name": "Eric Fong",
      "email": "ericff@gmail.com",
      "url": "http://waatag.com/"
    },
    "bugs": {
      "url": "https://github.com/ericfong/dpd-notify/issues"
    },
    "readmeFilename": "README.md",
    "users": {
      "ericfong": true
    },
    "_attachments": {}
  },
  "dpd-twilio": {
    "_id": "dpd-twilio",
    "_rev": "13-f7f9b1480c98276a93b58e35adcc63af",
    "name": "dpd-twilio",
    "description": "can send SMS via Twilio in deployd",
    "dist-tags": {
      "latest": "0.1.5"
    },
    "readme": "# dpd-twilio\n\n## Description\n\nSend SMS via Twilio. You should create your account in Twilio first.\n\n## Getting started\nThis module requires deployd ~0.7.0.\n\nIf you haven't used Deployd before, make sure to read the [documentation](http://docs.deployd.com/).\n\n### Installation without package.json\n````\nnpm install dpd-twilio\n````\n\n### Installation with package.json\nIf you have a package.json, you'll have to add this module in it.\n````\nnpm install dpd-twilio --save\n````\nOnce it is installed, Deployd will automatically load it.  \nFor more information about Modules, take a look at [the module page on the deployd documentation](http://docs.deployd.com/docs/using-modules/).\n\n## The dpd-twilio module\n### Overview\n\nIt is a simple [twilio](https://www.npmjs.org/package/twilio) wrapper for deployd\n\n### Options/Settings\n\nRequire:\n - twilioAccountSid\n - twilioAuthToken\n - defaultFromTel\n\nPlease fill them in using the deployd dashboard config page of this module.\n\n\n### Usage example\n\n    // send a SMS to +123456789\n    dpd.twilio.post({to:'+123456789', body:'Hello World!'});\n\n## Contributing\n\nJust send me a Pull Request in Github.\n\n## Release history\n\n - 0.1.0: first version\n\n## Contributors\n\n[Eric Fong](https://github.com/ericfong)\n",
    "maintainers": [
      {
        "name": "ericfong",
        "email": "ericff@gmail.com"
      }
    ],
    "time": {
      "modified": "2014-12-11T16:06:14.926Z",
      "created": "2014-11-29T00:57:36.611Z",
      "0.1.0": "2014-11-29T00:57:36.611Z",
      "0.1.1": "2014-11-29T16:18:45.523Z",
      "0.1.2": "2014-12-10T03:13:48.241Z",
      "0.1.3": "2014-12-10T03:15:01.530Z",
      "0.1.4": "2014-12-10T03:20:37.168Z",
      "0.1.5": "2014-12-11T16:06:14.926Z"
    },
    "author": {
      "name": "Eric Fong",
      "email": "ericff@gmail.com",
      "url": "http://waatag.com/"
    },
    "license": "ISC",
    "readmeFilename": "README.md",
    "users": {
      "ericfong": true
    },
    "keywords": [
      "dpd",
      "deployd",
      "dpdmodule",
      "twilio",
      "sms"
    ],
    "homepage": "https://github.com/ericfong/dpd-twilio",
    "repository": {
      "type": "git",
      "url": "https://github.com/ericfong/dpd-twilio"
    },
    "bugs": {
      "url": "https://github.com/ericfong/dpd-twilio/issues"
    },
    "_attachments": {}
  },
  "dpd-webfaction-api": {
    "_id": "dpd-webfaction-api",
    "_rev": "2-e91ec5ce56433a25343e8a2d59a651e9",
    "name": "dpd-webfaction-api",
    "description": "Deployd Resource to interact with Webfaction API",
    "dist-tags": {
      "latest": "0.0.1"
    },
    "readme": "dpd-webfaction-api\n==================\n\nDeployd Resource to interact with Webfaction API\n",
    "maintainers": [
      {
        "name": "federicot",
        "email": "federicot@gmail.com"
      }
    ],
    "time": {
      "modified": "2014-08-29T22:48:18.531Z",
      "created": "2014-08-29T22:48:18.531Z",
      "0.0.1": "2014-08-29T22:48:18.531Z"
    },
    "homepage": "https://github.com/federicot/dpd-webfaction-api",
    "keywords": [
      "deployd",
      "webfaction"
    ],
    "repository": {
      "type": "git",
      "url": "https://github.com/federicot/dpd-webfaction-api.git"
    },
    "author": {
      "name": "Federico Tarantini",
      "email": "federicot@gmail.com"
    },
    "bugs": {
      "url": "https://github.com/federicot/dpd-webfaction-api/issues"
    },
    "license": "MIT",
    "readmeFilename": "README.md",
    "_attachments": {}
  },
  "dpd-proxy": {
    "_id": "dpd-proxy",
    "_rev": "17-2612a8b2052e920d97732c54d72bb103",
    "name": "dpd-proxy",
    "description": "A simple proxy resource for deployd",
    "dist-tags": {
      "latest": "0.1.6"
    },
    "readme": "# Deployd Proxy Resource\r\n\r\nThis custom resource type allows you to forward requests to another server.\r\n\r\n## Installation\r\n\r\n`$ npm install dpd-proxy`\r\n\r\nSee [Installing Modules](http://docs.deployd.com/docs/using-modules/installing-modules.md) for details.\r\n\r\n## Configuration\r\n\r\nBefore using the proxy resource, you must go to its Dashboard page and configure it.\r\n\r\n### Required settings:\r\n\r\n**host**  \r\nThe hostname of your SMTP provider.\r\n\r\n### Optional settings:\r\n\r\n**username**  \r\nHTTP Basic Auth username.\r\n\r\n**password**  \r\nHTTP Basic Auth password.\r\n",
    "maintainers": [
      {
        "name": "diadistis",
        "email": "bsotirid@gmail.com"
      }
    ],
    "time": {
      "modified": "2013-12-26T18:42:04.036Z",
      "created": "2013-10-28T08:26:07.030Z",
      "0.0.1": "2013-10-28T08:26:12.095Z",
      "0.1.0": "2013-10-28T08:54:47.995Z",
      "0.1.1": "2013-10-28T09:45:01.986Z",
      "0.1.2": "2013-11-12T14:40:43.984Z",
      "0.1.3": "2013-11-19T21:42:09.215Z",
      "0.1.4": "2013-11-20T12:29:36.745Z",
      "0.1.5": "2013-12-22T13:35:00.567Z",
      "0.1.6": "2013-12-26T18:42:04.036Z"
    },
    "author": {
      "name": "Diadistis",
      "email": "bsotirid@gmail.com"
    },
    "repository": {
      "type": "git",
      "url": "git://github.com/diadistis/dpd-proxy.git"
    },
    "_attachments": {}
  },
  "dpd-imgix": {
    "_id": "dpd-imgix",
    "_rev": "4-3e630c5b49d29bc729f67a94a51855cb",
    "name": "dpd-imgix",
    "description": "dpd-imgix =========",
    "dist-tags": {
      "latest": "0.0.2"
    },
    "readme": "dpd-imgix\n=========\n\nimgix module for deployd\n",
    "maintainers": [
      {
        "name": "joliveira87",
        "email": "jpoliveira@sportsstarsmedia.com"
      }
    ],
    "time": {
      "modified": "2014-10-27T13:59:44.663Z",
      "created": "2014-10-27T10:24:42.306Z",
      "0.0.1": "2014-10-27T10:24:42.306Z",
      "0.0.2": "2014-10-27T13:59:44.663Z"
    },
    "homepage": "https://github.com/joliveira87/dpd-imgix",
    "keywords": [
      "deploud;",
      "imgix;"
    ],
    "repository": {
      "type": "git",
      "url": "https://github.com/joliveira87/dpd-imgix.git"
    },
    "author": {
      "name": "João Oliveira"
    },
    "bugs": {
      "url": "https://github.com/joliveira87/dpd-imgix/issues"
    },
    "license": "ISC",
    "readmeFilename": "README.md",
    "_attachments": {}
  },
  "dpd-passport-password-reset": {
    "_id": "dpd-passport-password-reset",
    "_rev": "4-439f7e42395a8121ef233b6cde7234cd",
    "name": "dpd-passport-password-reset",
    "description": "An extension for dpd-passport, that integrates password-reset functionality",
    "dist-tags": {
      "latest": "0.1.0"
    },
    "readme": "## Auth-Passport-Password-Reset Extension\n\nThis extensions adds password-reset by mail to `dpd-passport`.\n\n### Requirements\n\n* deployd (you'd have guessed that, probably :-))\n* `dpd-passport`\n* `dpd-email`\n* A Mandrill Account\n\n### Installation\n\nIn your app's root directory, type `npm install dpd-passport-password-reset` into the command line or [download the source](https://bitbucket.org/simpletechs/dpd-passport-password-reset). This should create a `dpd-passport-password-reset` directory in your app's `node_modules` directory.\n\nSee [Installing Modules](http://docs.deployd.com/docs/using-modules/installing-modules.md) for details.\n\n### Setup\n\nOpen your Dashboard and open the Passport-Auth Resource. \nThen configure the Mandrill Account you want to use for sending out emails.\n\n### Usage\n\nProvide a `form` that `POST`s to `/auth/forgot-password`, where `auth` needs to be the name of your Passport-Auth Resource.\nAs a parameter you need to supply the `username`. The extension will then go ahead and use `dpd-email` to send out an email to Mandrill, which will in turn use your template and send it to the user.\n\n### Development\n\nTo get started with development, please fork this repository and make your desired changes. Please note that we do all our dev work on bitbucket, so while you may submit pull requests on github, we will only push releases to github once they are finished.\n\n### Credits\n\nAuth-Passport-Password-Reset is the work of [simpleTechs.net](https://www.simpletechs.net)",
    "maintainers": [
      {
        "name": "simpletechs",
        "email": "info+npm@simpletechs.net"
      }
    ],
    "time": {
      "modified": "2015-02-03T21:53:20.497Z",
      "created": "2015-02-03T21:53:20.497Z",
      "0.1.0": "2015-02-03T21:53:20.497Z"
    },
    "keywords": [
      "deployd",
      "dpd-passport",
      "password-reset"
    ],
    "author": {
      "name": "Fabian Off, simpleTechs.net",
      "email": "fabian@simpletechs.net"
    },
    "license": "FreeBSD",
    "readmeFilename": "Readme.md",
    "users": {},
    "_attachments": {}
  },
  "dpd-jsinterval": {
    "_id": "dpd-jsinterval",
    "_rev": "4-d5863d84973bab4ae740d479e9a8b7a6",
    "name": "dpd-jsinterval",
    "description": "Deployd module for cron-like executing scripts",
    "dist-tags": {
      "latest": "0.0.1"
    },
    "readme": "# dpd-jsinterval\n",
    "maintainers": [
      {
        "name": "ipepe",
        "email": "npmjs@ipepe.pl"
      }
    ],
    "time": {
      "modified": "2015-02-04T14:13:42.208Z",
      "created": "2015-02-04T14:13:42.208Z",
      "0.0.1": "2015-02-04T14:13:42.208Z"
    },
    "homepage": "https://github.com/ipepe/dpd-jsinterval",
    "keywords": [
      "deployd",
      "dpd",
      "cron",
      "job",
      "interval",
      "scripts"
    ],
    "repository": {
      "type": "git",
      "url": "https://github.com/ipepe/dpd-jsinterval.git"
    },
    "author": {
      "name": "Patryk Ptasiński"
    },
    "bugs": {
      "url": "https://github.com/ipepe/dpd-jsinterval/issues"
    },
    "license": "ISC",
    "readmeFilename": "README.md",
    "users": {},
    "_attachments": {}
  },
  "dpd-feeder": {
    "_id": "dpd-feeder",
    "_rev": "6-77e38e4b9b163cc8bf2227ee44b76e75",
    "name": "dpd-feeder",
    "description": "import json into your deployd resources",
    "dist-tags": {
      "latest": "0.1.2"
    },
    "readme": "# dpd-feeder\r\n\r\n## Description\r\n\r\nFeed your [deployd](http://deployd.com/) resources from JSON.\r\n\r\n## Getting started\r\nThis module requires deployd ~0.7.0.\r\n\r\nIf you haven't used Deployd before, make sure to read the [documentation](http://docs.deployd.com/).\r\n\r\n### Installation without package.json\r\n````\r\nnpm install dpd-feeder\r\n````\r\n\r\n### Installation with package.json\r\nIf you have a package.json, you'll have to add this module in it.\r\n````\r\nnpm install dpd-feeder --save\r\n````\r\nOnce it is installed, Deployd will automatically load it.\r\nFor more information about Modules, take a look at [the module page on the deployd documentation](http://docs.deployd.com/docs/using-modules/).\r\n\r\n## The dpd-feeder module\r\n### Overview\r\n\r\n  Click new resource and choose **Feeder**.\r\n\r\n  Give it the default name \"/feeder\". Open it by clicking \"FEEDER\" in the left menu.\r\n\r\n  Paste your JSON from for example [json-generator](http://www.json-generator.com/)\r\n\r\n  Type name of resource you want to fill with data. You can choose to clear resource table first.\r\n\r\n  Click **Start Import**\r\n\r\n## Release history\r\n\r\n* 0.1.0 Initial release\r\n\r\n",
    "maintainers": [
      {
        "name": "qwal",
        "email": "qwalski@gmail.com"
      }
    ],
    "time": {
      "modified": "2014-12-05T21:59:02.315Z",
      "created": "2014-12-05T13:26:00.090Z",
      "0.1.0": "2014-12-05T13:26:00.090Z",
      "0.1.1": "2014-12-05T13:40:37.224Z",
      "0.1.2": "2014-12-05T21:59:02.315Z"
    },
    "homepage": "https://github.com/Qwal/dpd-feeder",
    "repository": {
      "type": "git",
      "url": "git://github.com/Qwal/dpd-feeder.git"
    },
    "author": {
      "name": "Damian Kowalski"
    },
    "bugs": {
      "url": "https://github.com/Qwal/dpd-feeder/issues"
    },
    "readmeFilename": "README.md",
    "keywords": [
      "deployd",
      "dpd",
      "json"
    ],
    "_attachments": {}
  },
  "dpd-collection-systemfields": {
    "_id": "dpd-collection-systemfields",
    "_rev": "2-7bcdc6b6759ec9dba295c1f14360fa76",
    "name": "dpd-collection-systemfields",
    "description": "An extension that adds system audit fields to deployd collections",
    "dist-tags": {
      "latest": "1.0.0"
    },
    "readme": "## dpd-collection-systemfields - System audit fields for deployd Collections\n\nThis collection extension allows you to easily track creation and change of objects in your deployd collections.\nCurrently the following audit fields are supported:\n* `createdBy`, the creating user's id - or `(root)` or `(anonymous)`\n* `createdDate`, timestamp (`Date.getTime()`) of the object's creation\n* `lastModifiedBy`, the user's id who edited this object last - or `(root)` or `(anonymous)`\n* `lastModifiedDate`, timestamp (`Date.getTime()`) of the object's last edit\n\nThe user can choose which audit fields to enable by simply creating the desired fields in the deployd dashboard.\nAny non-existing field will be untouched.\n\n**Note** these fields are not *protected* by default, i.e. the end user may try to write any value into them. \nYou need to protect the values in any write-event by specifying `protect('createdBy');` in the event handler.\n\n### Requirements\n\n* deployd (you'd have guessed that, probably :-))\n* Any Collection with some (or all) of these custom fields:\n```json\n    [\n        \"createdBy\": {\n            \"name\": \"createdBy\",\n            \"type\": \"string\",\n            \"typeLabel\": \"string\",\n            \"required\": false,\n            \"id\": \"createdBy\",\n            \"order\": 0\n        },\n        \"createdDate\": {\n            \"name\": \"createdDate\",\n            \"type\": \"number\",\n            \"typeLabel\": \"number\",\n            \"required\": false,\n            \"id\": \"createdDate\",\n            \"order\": 1\n        },\n        \"lastModifiedBy\": {\n            \"name\": \"lastModifiedBy\",\n            \"type\": \"string\",\n            \"typeLabel\": \"string\",\n            \"required\": false,\n            \"id\": \"lastModifiedBy\",\n            \"order\": 2\n        },\n        \"lastModifiedDate\": {\n            \"name\": \"lastModifiedDate\",\n            \"type\": \"number\",\n            \"typeLabel\": \"number\",\n            \"required\": false,\n            \"id\": \"lastModifiedDate\",\n            \"order\": 3\n        }\n    ]\n```\n\n### Installation\n\nIn your app's root directory, type `npm install dpd-collection-systemfields` into the command line or [download the source](https://bitbucket.org/simpletechs/dpd-collection-systemfields). This should create a `dpd-collection-systemfields` directory in your app's `node_modules` directory.\n\nSee [Installing Modules](http://docs.deployd.com/docs/using-modules/installing-modules.md) for details.\n\n### Setup\n\nCreate the fields you want to be managed on every Collection you want them on.\nNo additional setup is required, as every `Collection` (and every `Resource` that inherits from `Collection`) is automatically extended.\n\n### Usage\n\nView the fields in the dashboard or have them displayed in your app.\n\n### Credits\n\n`dpd-collection-systemfields` is the work of [simpleTechs.net](https://www.simpletechs.net)",
    "maintainers": [
      {
        "name": "simpletechs",
        "email": "info+npm@simpletechs.net"
      }
    ],
    "time": {
      "modified": "2015-02-03T22:03:02.537Z",
      "created": "2015-02-03T22:03:02.537Z",
      "1.0.0": "2015-02-03T22:03:02.537Z"
    },
    "keywords": [
      "deployd",
      "system-fields",
      "audit-fields"
    ],
    "author": {
      "name": "Fabian Off, simpleTechs.net",
      "email": "fabian@simpletechs.net"
    },
    "license": "FreeBSD",
    "readmeFilename": "Readme.md",
    "_attachments": {}
  },
  "dpd-sync": {
    "_id": "dpd-sync",
    "_rev": "4-888e0da108fa19281ae532661518df46",
    "name": "dpd-sync",
    "description": "A sync utility to use the internal dpd script on the server side.",
    "dist-tags": {
      "latest": "1.0.18"
    },
    "readme": "ERROR: No README data found!",
    "maintainers": [
      {
        "name": "akon",
        "email": "konoupakis@gmail.com"
      }
    ],
    "time": {
      "modified": "2014-09-11T00:43:05.276Z",
      "created": "2014-09-11T00:43:03.049Z",
      "1.0.18": "2014-09-11T00:43:05.276Z"
    },
    "readmeFilename": "",
    "keywords": [
      "deployd",
      "dpd",
      "dpd.js",
      "sync",
      "synchronous"
    ],
    "repository": {
      "type": "git",
      "url": "https://bitbucket.org/akonoupakis/dpd-sync.git"
    },
    "author": {
      "name": "Apostolis Konoupakis",
      "email": "konoupakis@gmail.com"
    },
    "bugs": {
      "url": "https://bitbucket.org/akonoupakis/dpd-sync/issues",
      "email": "konoupakis@gmail.com"
    },
    "license": "MIT",
    "_attachments": {}
  },
  "grunt-deployd": {
    "_id": "grunt-deployd",
    "_rev": "7-751507b3c5b3524d5c615db1ca206e14",
    "name": "grunt-deployd",
    "description": "Provides task to start deployd server",
    "dist-tags": {
      "latest": "0.1.2"
    },
    "readme": "# grunt-deployd\n\n> Provides task to start deployd server\n\n## Getting Started\nThis plugin requires Grunt `~0.4.1`\n\nIf you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:\n\n```shell\nnpm install grunt-deployd --save-dev\n```\n\nOnce the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:\n\n```js\ngrunt.loadNpmTasks('grunt-deployd');\n```\n\n## The \"deployd\" task\n\n### Overview\nIn your project's Gruntfile, add a section named `deployd` to the data object passed into `grunt.initConfig()`.\n\n```js\ngrunt.initConfig({\n  deployd: {\n    options: {\n      // Task-specific options go here.\n    },\n    your_target: {\n      // Target-specific file lists and/or options go here.\n    },\n  },\n})\n```\n\n### Options\n\n#### options.separator\nType: `String`\nDefault value: `',  '`\n\nA string value that is used to do something with whatever.\n\n#### options.punctuation\nType: `String`\nDefault value: `'.'`\n\nA string value that is used to do something else with whatever else.\n\n### Usage Examples\n\n#### Default Options\nIn this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`\n\n```js\ngrunt.initConfig({\n  deployd: {\n    options: {},\n    files: {\n      'dest/default_options': ['src/testing', 'src/123'],\n    },\n  },\n})\n```\n\n#### Custom Options\nIn this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`\n\n```js\ngrunt.initConfig({\n  deployd: {\n    options: {\n      separator: ': ',\n      punctuation: ' !!!',\n    },\n    files: {\n      'dest/default_options': ['src/testing', 'src/123'],\n    },\n  },\n})\n```\n\n## Contributing\nIn lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).\n\n## Release History\n_(Nothing yet)_\n",
    "maintainers": [
      {
        "name": "taras",
        "email": "tarasm@gmail.com"
      }
    ],
    "time": {
      "modified": "2013-08-14T18:29:54.898Z",
      "created": "2013-08-09T18:34:14.137Z",
      "0.1.0": "2013-08-09T18:34:15.197Z",
      "0.1.1": "2013-08-14T18:22:34.796Z",
      "0.1.2": "2013-08-14T18:29:54.898Z"
    },
    "author": {
      "name": "Taras Mankovski",
      "email": "tarasm@gmail.com"
    },
    "repository": {
      "type": "git",
      "url": "git://github.com/taras/grunt-deployd.git"
    },
    "_attachments": {}
  },
  "dpd-crypt": {
    "_id": "dpd-crypt",
    "_rev": "16-4c8a561d9a7f758275503d62b49836b7",
    "name": "dpd-crypt",
    "description": "This custom resource type allows md5 encryption.",
    "dist-tags": {
      "latest": "0.1.7"
    },
    "readme": "# dpd-crypt\n\nThis custom resource type allows you allows md5 encryption.\n\n## Installation\n\n`$ npm install dpd-crypt`\n\nSee [Installing Modules](http://docs.deployd.com/docs/using-modules/) for details.\n\n## Example Usage\n\n```\n\ndpd.md5.get({\n    string: 'Text to encode'\n}, function (results) {\n    // ...\n});\n\n```\n\n## Follow me on Twitter\n\n[@devOps92](https://twitter.com/devOps92)",
    "maintainers": [
      {
        "name": "devops92",
        "email": "devops92@gmail.com"
      }
    ],
    "time": {
      "modified": "2015-01-31T02:14:30.475Z",
      "created": "2015-01-16T06:20:54.028Z",
      "0.0.1": "2015-01-16T06:20:54.028Z",
      "0.0.2": "2015-01-16T07:00:16.459Z",
      "0.0.3": "2015-01-16T08:20:28.524Z",
      "0.0.4": "2015-01-16T08:28:17.403Z",
      "0.0.5": "2015-01-16T08:55:20.555Z",
      "0.0.6": "2015-01-26T04:12:21.839Z",
      "0.1.6": "2015-01-31T02:10:22.517Z",
      "0.1.7": "2015-01-31T02:14:30.475Z"
    },
    "homepage": "https://github.com/aramirez92/dpd-crypt",
    "repository": {
      "url": "git://github.com/aramirez92/dpd-crypt.git"
    },
    "author": {
      "name": "Alfredo Ramirez Ortega"
    },
    "bugs": {
      "url": "https://github.com/aramirez92/dpd-crypt/issues"
    },
    "readmeFilename": "README.md",
    "keywords": [
      "md5",
      "sha1",
      "crypt",
      "deployd"
    ],
    "_attachments": {}
  }
}