var express = require('express');
var router = express.Router();

let models = require('../models')


/* GET home page. */
router.get('/', function(req, res, next) {
  models.link.findAll().then(function (links) {
    res.render('index', { title: 'Sukses', links: links});
  })
});

router.post('/urls', function(req, res, next) {
  models.link.create({
    link: req.body.link
  }).then(function() {
    res.redirect('/')
  })
})

router.get('/go/:short', function(req, res, next) {
  models.link.findAll({
    where: {short: req.params.short}
  }).then(function(data) {
    let clickPlus = data[0].click+1
    models.link.update({click: clickPlus}, {where : {id: data[0].id}}).then(function() {
      res.redirect(data[0].link)
    })
  })
})

module.exports = router;
