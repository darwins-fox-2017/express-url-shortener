var express = require('express');
var router = express.Router();
//const crypto = require('crypto');
//const hash = crypto.createHash('md5');
const Model = require('../models')

// Encryption
function Encryption()
{
    let text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text
}

/* GET home page. */
router.get('/', function(req, res, next) {
  Model.Url_alias.findAll().then(function(urls) {
    res.render('index', {title: 'URL Shortener', url: urls })
  }).catch(function(err){
    res.render('index', {warning : "Data not found"})
  })
});

router.get('/link/:shorten', function(req, res, next) {
  Model.Url_alias.find({where: {shorten_url: req.params.shorten}}).then(function(url) {
    url.increment('is_clicked').then(function(){
      res.redirect(url.ori_url)
    })
  })
});

router.get('/new', function(req, res, next) {
  res.render('form_add_url')
})

router.post('/create', function(req, res, next) {
  Model.Url_alias.create({
    ori_url : req.body.url,
    shorten_url : Encryption(),
    is_clicked : 0
  }).then(function(){
    res.redirect('/')
  }).catch(function(err){
    console.log(err);
  })
})

module.exports = router;
