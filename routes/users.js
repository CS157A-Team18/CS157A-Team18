var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Provides the data for React to display
  res.json([
    {id: 1, username: "somebody"},
    {id: 2, username: "somebody_else"},
  ])
});

module.exports = router;
