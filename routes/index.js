var express = require('express');
var router = express.Router();

var adminRouter = require("./admin");
var v1Router = require("./v1");

const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

var Admin = require("../models/admin/admin");
// Require our controllers.
var admin_controller = require('../controllers/adminController');

router.post('/register', admin_controller.admin_create);
router.post('/login', admin_controller.admin_login);

router.use(function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({
            message: "Authorization not exist!",
        });
    }

    const raw = String(req.headers.authorization.split(" ").pop());
    const { id } = jwt.verify(raw, SECRET);

    Admin.findById(id, (err, existedAdmin) => {
        if (err) {
            return next(err);
        }

        if (!existedAdmin) {
            return res.status(401).send({
                message: "Identity is invalid!",
            });
        }
        Object.assign(req, {
            auth: {
                userid: existedAdmin._id,
                privilege: existedAdmin.privilege,
            },
        });
        next();
    });
});

router.use("/admins", adminRouter);
router.use("/v1", v1Router);


module.exports = router;