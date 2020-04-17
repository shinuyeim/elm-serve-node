var express = require('express');
var router = express.Router();

/* GET home data. */
router.get('/', function(req, res, next) {
  res.send("wellcome to elm-server-node");
});



module.exports = router;
