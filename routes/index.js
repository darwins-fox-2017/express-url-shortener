var express = require('express');
var router = express.Router();
var models = require('../models')

var env = process.env.MODE_ENV || 'development';
var config =  require(__dirname + '/../config/config.json')[env];

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Urls.findAll().then(function(urls){
    res.render('index', { title: 'Short Urls', urls:urls, urlDinamis:config.base_url });
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

router.get('/:short_url', function(req, res, next) {
  let setting_url = `${req.params.short_url}`
  models.Urls.findOne(
    {
      where: {
      short_url:setting_url
    }
  }).then(function(addUrl){
    if(addUrl === null){
      console.log("nothing data");
    }else {
      addUrl.count_url++
      addUrl.update({count_url:addUrl.count_url, updatedAt:new Date()})
      res.redirect(addUrl.url)
    }
  })
});




module.exports = router;
