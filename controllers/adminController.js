var Admin = require('../models/admin/admin')
var async = require('async')

// Display list of all admins.
exports.admin_list = function (req, res, next) {
    // res.send("GET admin/all not complete!");
    const { limit = 20, offset = 0 } = req.query;

    async.parallel({
        total_count: function (callback) {
            Admin.count().exec(callback)
        },
        list_admins: function (callback) {
            Admin.find()
                .sort([['user_name', 'ascending']])
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