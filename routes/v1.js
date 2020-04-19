var express = require('express');
var router = express.Router();

// Require our controllers.
var merchant_controller = require('../controllers/merchantController');

// GET request for list of all Merchant.
router.get('/merchants', merchant_controller.merchant_list);

router.get('/merchants/:id',merchant_controller.merchant_info);

router.delete('/merchants/:id',merchant_controller.merchant_delete);

// POST request for creating Merchant.
router.post('/merchants', merchant_controller.merchant_create);


router.patch('/merchants/:id', merchant_controller.merchant_update);

module.exports = router;