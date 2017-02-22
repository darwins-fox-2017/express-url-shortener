var express = require('express');
var router = express.Router();
var db = require('../models')
/* GET home page. */
router.get('/', function(req, res, next) {
  db.Url.findAll().then(function(urlData){
    res.render('index', { title: 'URL shorten' , data : urlData});
  })
});

router.get('/:short_url', function(req, res, next) {
  db.Url.findAll({
    where : {
      url_shorten: req.params.short_url
    }
  }).then(function(url){
    db.Url.update(
      {click_count : url[0].click_count+1},
      {where : {id : url[0].id}}
    ).then(function(){
      res.redirect(url[0].url_origin);
    })
  })
});

router.post('/', function(req, res, next) {
  db.Url.create({
    url_origin : req.body.linkOrigin
  }).then(function() {
    res.redirect("/")
  })
});

module.exports = router;
