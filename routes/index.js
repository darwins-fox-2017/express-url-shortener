var express = require('express');
var router = express.Router();
var db = require('../models')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'URL SHORTENER' });
// });

router.get('/', function(req, res, next) {
  db.Shortener.findAll( {raw: true}).then(function (result) {
      res.render('index', {title: 'URL SHORTENER', data: result})
  })
});

router.post('/', function(req, res, next) {
  db.Shortener.create({
    url: req.body.url
  }).then(function(result) {
    res.redirect('/')
  })
});

router.get('/url/:shortener_link', function(req, res, next) {
  db.Shortener.findOne({
    where: {
      shortener_link: req.params.shortener_link
    }
  }).then(function(result) {
      result.update({
         click : result.click + 1
      }).then(function(data){
        res.redirect(`${data.url}`)
      })
  })
});

module.exports = router;
