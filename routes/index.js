var express = require('express');
var router = express.Router();
var db = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Linkshort.findAll().then(function(links) {
    res.render('index', { title: 'Express',name: 'Daniel Agus', semua_links: links});
  })

});


router.get('/new', function(req, res, next) {
  res.render('form', { title : 'Express'})
})

router.post('/create', function(req, res, next) {
  db.Linkshort.create({
    link_awal: req.body.link
  }).then(function(link) {
    res.redirect('/')
  }).catch(function(err) {
    res.redirect('/new')
  })
})

//
router.get('/url/:link_short', function(req, res, next) {
  db.Linkshort.findOne({
    where : {
      link_short : req.params.link_short
    }
  }).then(function(result) {
    result.update({
      link_count : result.link_count + 1
    }).then(function(data) {
      res.redirect(`${data.link_awal}`)
    })
  })
})

module.exports = router;
