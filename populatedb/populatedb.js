#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith("mongodb")) {
    console.log(
        "ERROR: You need to specify a valid mongodb URL as the first argument"
    );
    return;
}

var async = require("async");
var Admin = require("../models/admin.js");
var Merchant = require("../models/merchant.js");

const adminData = require("./data/adminData");
const merchantData = require("./data/merchantData");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.dropDatabase();


async.series(
    [createAdmin, createMerchant],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log("FINAL ERR: " + err);
        }
        // All done, disconnect from database
        mongoose.connection.close();
    }
);

function adminCreate(user_name, password, register_date, city, privilege, cb) {
    admindetail = { user_name, password, register_date, city, privilege };

    var admin = new Admin(admindetail);

    admin.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log("New Admin: " + admin);
        cb(null, admin);
    });
}

function createAdmin(cb) {
    async.eachLimit(
        adminData,
        10,
        function (item, callback) {
            adminCreate(
                item.name,
                item.password,
                item.date,
                item.address,
                item.privilege,
                callback
            );
        },
        cb
    );

    // async.series([
    //     // function (callback) {
    //     //     adminCreate('张三', '123456', '2019-06-06', "上海", 0, callback);
    //     // },
    //     // function (callback) {
    //     //     adminCreate('BenBova', 'Zimu_123', '2019-11-08', "北京", 1, callback);
    //     // }
    // ],
    //     // optional callback
    //     cb);
}

function merchantCreate(
    shop_name,
    register_date,
    address,
    phone,
    introduction,
    cb
) {
    const merchantdetail = {
        shop_name,
        register_date,
        address,
        phone,
        introduction,
    };

    var merchant = new Merchant(merchantdetail);

    merchant.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log("New Merchant: " + merchant);
        cb(null, merchant);
    });
}

function createMerchant(cb) {
    async.eachLimit(
        merchantData,
        10,
        function (item, callback) {
            merchantCreate(
                item.name,
                item.date,
                item.address,
                item.phone,
                item.introduction,
                callback
            );
        },
        cb
    );
}
