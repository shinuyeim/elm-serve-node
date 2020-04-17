var Admin = require('../models/admin/admin')


// Display list of all admins.
exports.admin_list = function (req, res, next) {
    // res.send("GET admin/all not complete!");
    const {limit = 20, offset = 0} = req.query;

    Admin.find()
        .sort([['user_name', 'ascending']])
        .skip(Number(offset))
        .limit(Number(limit))
        .exec(function (err, list_admins) {
            if (err) { return next(err); }
            // Successful, so render.
            res.send({
                requst_metadata:{
                    Total:list_admins.length,
                    Limit:Number(limit),
                    LimitOffset:Number(offset),
                    ReturnedRows:list_admins.length,
                },
				data: list_admins,
			})
        })

};