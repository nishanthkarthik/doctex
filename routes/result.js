var express = require('express');
var router = express.Router();
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename).replace('bin', 'uploads/');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(JSON.stringify(req.query));
	console.log(appDir);
	if (_.has(req.query, 'id') && req.query.id) {
		var filename = appDir + req.query.id;
		fs.stat(filename, function(err, stats) {
			if (err) {
				console.log(err);
				res.json({
					error: err
				});
			} else if (err == null) {
				//res.download(filename);
				fs.readFile(filename, 'utf8', function(err, data) {
					if (err)
						console.log(err);
					res.setHeader('Content-Type', 'text/html');
					res.end(data);
				});
			} else
				res.json({
					error: 'file not available'
				});
		});
	} else {
		res.json({
			error: 'no id parameter specified'
		});
	}
});

module.exports = router;