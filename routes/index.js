var express = require('express');
var router = express.Router();
var fs = require("fs"),
    json;

function readJsonFileSync(filepath, encoding){
    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/videos', function(req, res, next) {
  res.render('video', { title: 'Videos' });
});

router.get('/list', function(req, res, next) {
	var filepath = __dirname + '/../topVideos.json';
    console.log(filepath);
    res.send(readJsonFileSync(filepath));  
});

module.exports = router;
