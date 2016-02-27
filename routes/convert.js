var express = require('express');
var router = express.Router();
var multer = require('multer')
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.json({
		error: 'not implemented'
	});
});

/*POST conversion api*/
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads');
	},
	filename: function(req, file, callback) {
		callback(null, file.originalname);
	}
});

var upload = multer({
	storage: storage
}).single('userDoc');

router.post('/', function(req, res) {
	upload(req, res, function(err) {
		if (err)
			return res.json({
				error: 'error uploading file',
				detail: err
			});

		//process files here
		fs.rename(req.file.originalname, req.file.originalname + '.tex', function(err) {
			res.json({
				message: 'uploaded',
				result_url: '/result?id=' + req.file.originalname + '.tex'
			});
		});

	});
});

module.exports = router;