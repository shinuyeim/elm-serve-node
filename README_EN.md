# elm-server-node
[README 中文](README.md)

这是shinuyyeim/elm项目的后端系统，相关API参见 [API.md](API.md)。

该项目管理系统（前端），参见 [elm-manage-vue2](https://github.com/shinuyeim/elm-manage-vue2)。

## Getting Start

### Local Server
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

## Features
- [ ] 管理员注册登录 -- 进行中
- [x] 管理员信息获取 -- 已完成
- [x] 商家创建更新与获取 -- 已完成


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## What's Here
* [/bin/www](/bin/www) - the entry point of the application
* [app.js](app.js) - This file creates an express application object.
* [package.json](package.json) - Dependencies for the node.js server.
* [API.md](API.md) - RESTful API of this application.

## Acknowledg
* [Express](https://expressjs.com/) - The web framework used
* [Mongoose](https://mongoosejs.com/) - mongodb object modeling for node.js