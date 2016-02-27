var express = require('express');
var router = express.Router();
var multer = require('multer')

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads');
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now());
	}
});

var upload = multer({
	storage: storage
}).single('docfile');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.json({
		error: 'not implemented'
	});
});

router.post('/', function(req, res) {
	upload(req, res, function(err) {
		if (err)
			return res.json({
				error: 'error uploading file'
			});
		res.json({
			message: 'uploaded',
			result_url: 'to be implemented'
		});
	});
});

module.exports = router;