var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const jwt = require('jsonwebtoken');
const SECRET = 'token_secret';

var Admin = require('./models/admin/admin');
// var indexRouter = require('./routes/index');
var adminRouter = require("./routes/admin");
var v1Router = require("./routes/v1");

var app = express();

// Set up mongoose connection
var mongoose = require("mongoose");
var dev_db_url = "mongodb://localhost:27017/elm_server?retryWrites=true";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.all("*", (req, res, next) => {
    const { origin, Origin, referer, Referer } = req.headers;
    const allowOrigin = origin || Origin || referer || Referer || "*";
    res.header("Access-Control-Allow-Origin", allowOrigin);
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Requested-With"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("X-Powered-By", "Express");
    if (req.method == "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use('/', indexRouter);
app.use(function (req, res, next) {
    if (req.url == "/admins/login" && req.url == "/admins/register") {
        return next();
    }

    if (!req.headers.authorization) {
        return res.status(401).send({
            message: "Authorization not exist!"
        })
    }

    const raw = String(req.headers.authorization.split(' ').pop());
    const { id } = jwt.verify(raw, SECRET);

    Admin.findById(id, (err, existedAdmin) => {
        if (err) { return next(err) }

        if (!existedAdmin) {
            return res.status(401).send({
                message: "Identity is invalid!"
            })
        }
        Object.assign(req, {
            auth: {
                "userid": existedAdmin._id,
                "privilege": existedAdmin.privilege
            }
        })
        next();
    })
});

app.use("/admins", adminRouter);
app.use("/v1", v1Router);

// catch 404 and forward to error handler
// 捕获 404 并抛给错误处理器
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
// 错误处理器
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    // 设置 locals，只在开发环境提供错误信息
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    // 渲染出错页面
    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;
