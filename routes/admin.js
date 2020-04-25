var express = require('express');
var router = express.Router();

// Require our controllers.
var admin_controller = require('../controllers/adminController');


// GET request for list of all Admin.
router.get('/', admin_controller.admin_list);

router.delete('/:id', admin_controller.admin_delete);

router.put('/profile', admin_controller.admin_update);

router.get('/profile', admin_controller.admin_profile);

module.exports = router;
