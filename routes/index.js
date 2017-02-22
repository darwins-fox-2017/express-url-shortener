var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('urls/index', { title: 'Express' });
});

router.get('/:url(*)', function(req, res, next){
  
})

module.exports = router;
