var express = require('express');
var router = express.Router();
var models = require('../models')
/* GET home page. */
router.get('/', function(req, res, next) {
  models.Urls.findAll().then(function(urls){
    res.render('index', { title: 'Short Urls', urls:urls });
  })
});

router.post('/create', function(req, res, next) {
  models.Urls.create({
    url:req.body.url,
    short_url:req.body.short_url
  }).then(function(data_url){
    res.redirect('/')
  })
});



module.exports = router;
