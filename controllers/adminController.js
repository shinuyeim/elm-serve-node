var Admin = require('../models/admin/admin');
const validator = require('express-validator');
var async = require('async')

// Display list of all admins.
exports.admin_list = function (req, res, next) {
    // res.send("GET admin/all not complete!");
    const { limit = 20, offset = 0 } = req.query;

    async.parallel({
        total_count: function (callback) {
            Admin.countDocuments().exec(callback)
        },
        list_admins: function (callback) {
            Admin.find({}, { password: 0 })
                .sort({ 'user_name': 'ascending' })
                .skip(Number(offset))
                .limit(Number(limit))
                .exec(callback)
        },
    }, function (err, result) {
        if (err) { return next(err); }
        // Successful, so render.
        res.status(200).json({
            metadata: {
                Total: result.total_count,
                Limit: Number(limit),
                LimitOffset: Number(offset),
                ReturnedRows: result.list_admins.length,
            },
            data: result.list_admins,
        })
    }
    )
};

exports.admin_delete = function (req, res, next) {
    const admin_id = req.params.id;

    Admin.findByIdAndRemove(admin_id, function (err) {
        if (err) {
            res.status(500).json({
                massage: err,
            })
            return next(err);
        }
        // Successful, so render.
        res.status(204).send();
    });
}

exports.admin_create = [
    // Validate fields.
    validator.body('user_name').not().isEmpty().trim().withMessage('user_name must be specified.').isLength({ max: 20 }).trim().withMessage(' length exceed.').escape(),
    validator.body('password').not().isEmpty().trim().withMessage('password must be specified.').isLength({ max: 16 }).trim().withMessage(' length exceed.').escape(),
    validator.body('city').if((value, { req }) => req.body.city).not().isEmpty().trim().withMessage('city must be specified.').isLength({ max: 60 }).trim().withMessage(' length exceed.').escape(),
    validator.body('register_date').if((value, { req }) => req.body.register_date).isISO8601().toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.status(500).json({
                massage: errors,
            })
            return;
        }

        // Data from form is valid.
        Admin.count({ user_name: req.body.user_name }).then(
            (existAdminCount) => {
                if (existAdminCount > 0) {
                    res.status(500).json({
                        massage: "user_name existed!",
                    })
                    return;
                }

                // Create Admin object with escaped and trimmed data
                const admin = new Admin(
                    {
                        user_name: req.body.user_name,
                        password: req.body.password,
                        privilege: 1,
                        register_date: req.body.register_date,
                        city: req.body.city
                    }
                );

                // Save admin.
                admin.save(function (err) {
                    if (err) {
                        res.status(500).json({
                            massage: err,
                        })
                        return next(err);
                    }
                    // Successful - redirect to new admin record.
                    res.status(201).send();
                });
            }
        )
    }

]

exports.admin_login = [

    validator.body('user_name').not().isEmpty().trim().withMessage('user_name must be specified.').isLength({ max: 20 }).trim().withMessage(' length exceed.').escape(),
    validator.body('password').not().isEmpty().trim().withMessage('password must be specified.').isLength({ max: 16 }).trim().withMessage(' length exceed.').escape(),


    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.status(500).json({
                massage: errors,
            })
            return;
        }

        Admin.findOne({ user_name: req.body.user_name }).then(
            (existedName)=>{
                if(!existedName){
                    res.status(401).send({
                        massage:"this user not existed!"
                    })
                    return;
                }
                if(req.body.password !== existedName.password){
                    res.status(401).send({
                        massage:"password not true!"
                    })
                }
                res.status(200).send();
            }
        )
    }
]

exports.admin_update = [
    // Validate fields.
    validator.body('_id').not().exists(),
    validator.body('shop_name').if((value, { req }) => req.body.shop_name).not().isEmpty().trim().withMessage('shop_name must be specified.').isLength({ max: 20 }).trim().withMessage(' length exceed.').escape(),
    validator.body('register_date').if((value, { req }) => req.body.register_date).isISO8601().toDate(),
    validator.body('address').if((value, { req }) => req.body.address).not().isEmpty().trim().withMessage('address must be specified.').isLength({ max: 60 }).trim().withMessage(' length exceed.').escape(),
    validator.body('phone').if((value, { req }) => req.body.phone).isMobilePhone(['zh-CN']).trim().escape(),
    validator.body('introduction').if((value, { req }) => req.body.introduction).isLength({ max: 200 }).trim().withMessage(' length exceed.').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.

        const errors = validator.validationResult(req);


        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.status(500).json({
                massage: errors,
            })
            return;
        }
        else {
            // Data is valid. Update the record.
            Admin.findByIdAndUpdate(req.params.id, req.body, {}, function (err) {
                if (err) {
                    res.status(500).json({
                        massage: err,
                    })
                    return next(err);
                }
                // Successful 
                res.status(200).send();
            });
        }
    }
];


