const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/lobby', function(req, res, next) {
	res.render('lobby');
});

router.get('/game', function(req, res, next) {
	res.render('index');
});

module.exports = router;
