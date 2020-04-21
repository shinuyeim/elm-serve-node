'use strict';

var mongoose = require('mongoose');
// var moment = require('moment');

const Schema = mongoose.Schema;

const MerchantSchema = new Schema({
	shop_name: { type: String, required: true, maxlength: 20 },
	register_date: { type: Date },
	address: { type: String, maxlength: 60 },
	phone: { type: String, maxlength: 11 },
	introduction: { type: String, maxlength: 200 },
});

// MerchantSchema.virtual('register_date_yyyy_mm_dd').get(function () {
// 	return moment(this.register_date).format('YYYY-MM-DD');
// });

module.exports = mongoose.model('Merchant', MerchantSchema);
