var Merchant = require('../models/merchant/merchant');
const validator = require('express-validator');

// Display list of all merchants.
exports.merchant_list = function (req, res, next) {
    const { limit = 20, offset = 0 } = req.query;

    Merchant.find()
        .sort([['shop_name', 'ascending']])
        .skip(Number(offset))
        .limit(Number(limit))
        .exec(function (err, list_merchants) {
            if (err) { return next(err); }
            // Successful, so render.
            res.json({
                requst_metadata: {
                    Total: list_merchants.length,
                    Limit: Number(limit),
                    LimitOffset: Number(offset),
                    ReturnedRows: list_merchants.length,
                },
                data: list_merchants,
            })
        })

};

exports.merchant_delete = function (req, res, next) {
    const merchant_id = req.params.id;

    Merchant.findByIdAndRemove(merchant_id, function (err) {
        if (err) {
            res.json({
                status: 1,
                massage: err,
            })
            return next(err);
        }
        // Successful, so render.
        res.json({
            status: 0,
            massage: 'Delete sucess.',
        })
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

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.json({
                status: 1,
                massage: errors,
            })
            return;
        }
        else {
            // Data from form is valid.

            // Save merchant.
            merchant.save(function (err) {
                if (err) {
                    res.json({
                        status: 1,
                        massage: err,
                    })
                    return next(err);
                }
                // Successful - redirect to new merchant record.
                res.json({
                    status: 0,
                    massage: 'Create sucess.',
                })
            });
        }
    }
];