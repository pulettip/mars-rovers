var express = require('express');
var router = express.Router();
var utils = require('./utils');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('API');
});

router.post('/rovers_position', function(req, res, next) {
	let response = utils.processStringInput(req.body.input_value);
	if (req.body.redirect) res.render('rovers', { title: 'Mars Rovers', data: response.rovers_result, error: response.error });
	else res.send(response);
});

module.exports = router;
