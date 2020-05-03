'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    name: { type: String, maxlength: 20 },
    address: { type: String, maxlength: 60 },
    phone: { type: String, maxlength: 11 },
})

module.exports = mongoose.model('Customer', CustomerSchema);