var Merchant = require('../models/merchant/merchant');
const validator = require('express-validator');
var async = require('async')

// Display list of all merchants.
exports.merchant_list = function (req, res, next) {
    const { limit = 20, offset = 0 } = req.query;

    async.parallel({
        total_count: function (callback) {
            Merchant.countDocuments().exec(callback)
        },
        list_merchants: function (callback) {
            Merchant.find()
                .sort({ 'register_date': 'descending' })
                .skip(Number(offset))
                .limit(Number(limit))
                .exec(callback)
        }
    }, function (err, result) {
        if (err) { return next(err); }
        res.status(200).json({
            metadata: {
                Total: result.total_count,
                Limit: Number(limit),
                LimitOffset: Number(offset),
                ReturnedRows: result.list_merchants.length
            },
            data: result.list_merchants
        })
    }
    )

};

exports.merchant_info = function (req, res, next) {
    const merchant_id = req.params.id;

    Merchant.findById(merchant_id, function (err, merchant) {
        if (err) {
            return next(err);
        }
        // Successful, so render.
        res.status(200).json({
            data: merchant,
        })
    })

};

exports.merchant_delete = function (req, res, next) {
    const merchant_id = req.params.id;

    Merchant.findByIdAndRemove(merchant_id, function (err) {
        if (err) {
            return next(err);
        }
        // Successful, so render.
        res.status(204).send();
    });
}

// Handle Merchant create on POST.
exports.merchant_create = [

    // Validate fields.
    validator.body('shop_name').not().isEmpty().trim().withMessage('shop_name must be specified.').isLength({ max: 20 }).trim().withMessage(' length exceed.').escape(),
    validator.body('address').not().isEmpty().trim().withMessage('address must be specified.').isLength({ max: 60 }).trim().withMessage(' length exceed.').escape(),
    validator.body('register_date').isISO8601().toDate(),
    validator.body('phone').isMobilePhone(['zh-CN']).trim().escape(),
    validator.body('introduction').isLength({ max: 200 }).trim().withMessage(' length exceed.').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            return res.status(422).send(errors);
        }
        else {
            // Data from form is valid.
            // Create Merchant object with escaped and trimmed data
            const merchant = new Merchant(
                {
                    shop_name: req.body.shop_name,
                    register_date: req.body.register_date,
                    address: req.body.address,
                    phone: req.body.phone,
                    introduction: req.body.introduction
                }
            );

            // Save merchant.
            merchant.save(function (err) {
                if (err) {
                    return next(err);
                }
                // Successful - redirect to new merchant record.
                res.status(201).send();
            });
        }
    }
];

exports.merchant_update = [
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
            return res.status(422).send(errors);
        }
        else {
            // Data is valid. Update the record.
            Merchant.findByIdAndUpdate(req.params.id, req.body, {}, function (err) {
                if (err) {
                    return next(err);
                }
                // Successful 
                res.status(200).send();
            });
        }
    }
];