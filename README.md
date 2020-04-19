# elm-server-node

## Getting Started

### Local server
------------

This app comes with a simple server ([`server.js`](./server.js)), but can be served through any means.

To use the packaged server:

* Install [node.js](http://nodejs.org/)
* From the root directory, run `npm install`

Pupulate MongoDB database
```
node populatedb/populatedb.js mongodb://localhost:27017/elm_server
```

Available scripts:
* `npm start` - Start server
* `npm run devstart` - Start server with nodemon
* `DEBUG=elm-server-node:* npm run devstart` - Start server with debug mode

## Built With
* [Express](https://expressjs.com/) - The web framework used
* [Mongoose](https://mongoosejs.com/) - mongodb object modeling for node.js

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.


## What's here
* [/bin/www](/bin/www) - the entry point of the application
* [app.js](app.js) - This file creates an express application object.
* [package.json](package.json) - Dependencies for the node.js server.
* [API.md](API.md) - RESTful API of this application.