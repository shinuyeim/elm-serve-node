var express = require('express');
var router = express.Router();

// Require our controllers.
var merchant_controller = require('../controllers/merchantController');

// GET request for list of all Merchant.
router.get('/all', merchant_controller.merchant_list);

module.exports = router;