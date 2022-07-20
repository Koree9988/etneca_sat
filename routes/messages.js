var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/send', function(req, res, next) {
  const payload = req.body.payload
  console.log(payload);
  res.send(`Fowarded payload to gateway "${payload}"`);
});

module.exports = router;
