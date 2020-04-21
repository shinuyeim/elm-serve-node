'use strict';

var mongoose = require('mongoose');
// var moment = require('moment');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    user_name: { type: String, required: true, maxlength: 20, unique: true },
    // user_name: { type: String, required: true, maxlength: 20 },
    password: { type: String, required: true, maxlength: 16 },
    register_date: { type: Date, default: new Date() },
    city: { type: String, maxlength: 60 },
    privilege: { type: Number, max: 1, min: 0, required: true, default: 1 } //权限：0代表超级管理员，1代表管理员
})

// AdminSchema.virtual('register_date_yyyy_mm_dd').get(function () {
//     return moment(this.register_date).format('YYYY-MM-DD');
// });

// AdminSchema.virtual('privilege_str').get(function () {
//     let privilege_str = '';

//     switch (this.privilege) {
//         case 0:
//             privilege_str = "超级管理员";
//             break;
//         case 1:
//             privilege_str = "管理员";
//             break;
//     }

//     return privilege_str;
// });

module.exports = mongoose.model('Admin', AdminSchema);