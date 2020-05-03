const Customer = require('../models/customer');
const User = require('../models/user');
const validator = require('express-validator');
var async = require('async');

const user_controller = require('./userController');

exports.customer_create = [
    // Validate fields.
    validator.body('user_name').not().isEmpty().trim().withMessage('user_name must be specified.').isLength({ max: 20 }).trim().withMessage(' length error.').escape(),
    validator.body('password').not().isEmpty().trim().withMessage('password must be specified.').isLength({ min: 6, max: 16 }).trim().withMessage(' length error.').escape(),

    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            return res.status(422).send(errors);
        }
        else {
            // Data from form is valid.
            const customerdata = {
                user_name: req.body.user_name,
                password: req.body.password,
                role: 2
            }
            user_controller.user_create(customerdata, function (err, userid) {
                if (err) { return next(err); }
                // Create Customer object with escaped and trimmed data
                const customer = new Customer(
                    {
                        user: userid
                    }
                );
                // Save customer.
                customer.save(async function (err) {
                    if (err) {
                        await User.findByIdAndRemove(userid);
                        return next(err);
                    }
                    // Successful - redirect to new customer record.
                    res.status(201).send();
                });
            })
        }
    }
];

exports.customer_update = [
    // Validate fields.
    validator.body('_id').not().exists().withMessage('Can not update _id'),
    validator.body('name').if((value, { req }) => req.body.name).not().isEmpty().trim().withMessage('name must be specified.').isLength({ max: 20 }).trim().withMessage(' length exceed.').escape(),
    validator.body('address').if((value, { req }) => req.body.address).not().isEmpty().trim().withMessage('address must be specified.').isLength({ max: 60 }).trim().withMessage(' length exceed.').escape(),
    validator.body('phone').if((value, { req }) => req.body.phone).isMobilePhone(['zh-CN']).trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.

        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            return res.status(422).send(errors);
        }
        else {
            // Data is valid. Update the record.
            const customer = {
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone
            }
            Merchant.findByIdAndUpdate(req.params.id, customer, {}, function (err) {
                if (err) {
                    return next(err);
                }
                // Successful 
                res.status(200).send();
            });
        }
    }
];