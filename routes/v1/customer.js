var express = require('express');
var router = express.Router();

// Require our controllers.
var customer_controller = require('../../controllers/customerController');


router.put('/:id', customer_controller.customer_update);

router.get('/', customer_controller.customer_list);

router.get('/:id', customer_controller.customer_info);

router.delete('/:id',customer_controller.customer_delete);

module.exports = router;

