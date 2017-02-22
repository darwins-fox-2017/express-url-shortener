var express = require('express');
var router  = express.Router();
var models  = require('../models')
var env     = process.env.MODE_ENV || 'development';
var config  = require(__dirname + '/../config/config.json')[env];
var url     = models.Url
/* GET home page. */
router.get('/', function(req, res, next) {
  url.findAll().then(function(url){
      res.render('index', { title: 'URL Shortener is.id', data_url: url, new_url: config.base_url });
  })
});

router.get('/:short_url', function(req, res, next) {
  let setting_url = `${req.params.short_url}`
  url.findOne({where: {short_url:setting_url}}).then(function(addUrl){
    if(addUrl === null){
      console.log("nothing data");
    } else {
      addUrl.click_count++
      res.redirect("https://"+ addUrl.url)
      addUrl.update({click_count:addUrl.click_count, updatedAt:new Date()})
    }
  })
});

router.post('/short_url', function(req, res, next) {
  url.create({url:req.body.url,short_url:req.body.short_url}).then(function(){
    res.redirect('/')
  })
});

router.get('/update/:id', function(req, res, next) {
  url.findById(req.params.id).then(function(urlupdate){
    res.render('update',{title:"Form URL Update List", data:urlupdate});
  })
})

router.post('/update/:id', function(req, res, next) {
  url.findById(req.params.id).then(function(urlupdate){
    url.update({url:req.body.url}, {where:{id: req.params.id}
    }).then(function(){
      res.redirect('/')
    })
  })
})

router.get('/delete/:id', function(req, res){
  url.findById(req.params.id).then(function(urlupdate){
    if(urlupdate){
      res.redirect('/')
      urlupdate.destroy({where:{id:req.body.id}})
    }
  })
});

module.exports = router;
