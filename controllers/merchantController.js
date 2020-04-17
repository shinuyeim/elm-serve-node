var Merchant = require('../models/merchant/merchant');

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
            res.send({
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