# elm-server-node

## Project setup
```
npm install
```

### run the app
```
DEBUG=elm-server-node:* npm start
```
or 
```
DEBUG=elm-server-node:* npm run devstart
```

### build MongoDB database
```
node populatedb/populatedb.js mongodb://localhost:27017/elm_server
```