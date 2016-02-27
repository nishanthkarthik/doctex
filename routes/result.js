var express = require('express');
var router = express.Router();
var _ = require('lodash');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(JSON.stringify(req.query));
	if (_.has(req.query, 'id') && req.query.id) {
		var filename = __dirname + '/uploads/' + req.body.id;
		fs.stat(filename, function(err, stats) {
			if (err)
				console.log(err);
			if (stats.isFile())
				res.download(filename);
			else
				res.json({error: 'file not available'});
		});
	}
	res.json({
		error: 'no id parameter specified'
	});
});

module.exports = router;