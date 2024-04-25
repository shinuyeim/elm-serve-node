# elm-server-node
[README in English](README_EN.md)

这是shinuyeim/elm项目的后端系统，相关API参见 [API.md](API.md)。

该项目管理系统（前端），参见 [elm-manage-vue2](https://github.com/shinuyeim/elm-manage-vue2)。

## 启动

### 本地服务器
------------

该应用程序自带一个简单的服务器（[`server.js`](./server.js)），但可以通过任何方式提供服务。

要使用打包的服务器，你需要按照以下步骤操作：

* 安装 [node.js](http://nodejs.org/)
* 从根目录运行 `npm install`。

填充 MongoDB 数据库
```
node populatedb/populatedb.js mongodb://127.0.0.1:27017/elm_server
```

可用的脚本:
* `npm start` - 启动服务
* `npm run devstart` - 使用 nodemon 这个工具来启动服务器
* `DEBUG=elm-server-node:* npm run devstart` - 启动服务器并使用调试模式

## 功能特性
- [ ] 管理员注册登录 -- 进行中
- [x] 管理员信息获取 -- 已完成
- [x] 商家创建更新与获取 -- 已完成


## 参与贡献

请阅读[CONTRIBUTING.md](CONTRIBUTING.md)文件，了解我们的行为准则详情，以及向我们提交拉取请求的过程。

## 文件说明
* [/bin/www](/bin/www) - 应用程序的入口点
* [app.js](app.js) - 该文件创建了一个 Express 应用程序对象
* [package.json](package.json) - Node.js 服务器的依赖项
* [API.md](API.md) - 这个应用程序的 RESTful API

## 致谢
* [Express](https://expressjs.com/) - 所使用的网络框架
* [Mongoose](https://mongoosejs.com/) - MongoDB 对象建模用于 Node.js