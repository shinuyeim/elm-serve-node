var express = require('express');
var router = express.Router();

// Require our controllers.
var admin_controller = require('../controllers/adminController');


// GET request for list of all Admin.
router.get('/list', admin_controller.admin_list);

module.exports = router;
