var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'City Youth Team Manager' });
});
router.get('/about',function(req,res,next){
res.render('about');
});

router.get('/contact',function(req,res,next){
  res.render('about');
  });
module.exports = router;
