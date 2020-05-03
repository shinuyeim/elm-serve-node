var express = require('express');
var router = express.Router();

// Require our controllers.
var customer_controller = require('../../controllers/customerController');


router.put('/:id', customer_controller.customer_update);

module.exports = router;

