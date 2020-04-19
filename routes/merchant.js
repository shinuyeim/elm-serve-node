var express = require('express');
var router = express.Router();

// Require our controllers.
var merchant_controller = require('../controllers/merchantController');

// GET request for list of all Merchant.
router.get('/all', merchant_controller.merchant_list);

router.delete('/:id',merchant_controller.merchant_delete);

// POST request for creating Merchant.
router.post('/create', merchant_controller.merchant_create);

// POST request to update Merchant.
router.put('/:id', merchant_controller.merchant_update);

module.exports = router;