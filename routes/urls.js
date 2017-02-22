var express = require('express');
var router = express.Router();

let db = require('../models')
var shortid = require('shortid');

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.Link.findAll().then((links) => {
    res.render('urls/index', {links: links})
    // res.send('respond with a resource');
  })
});

router.get('/new', function(req, res, next){
  res.render('urls/create')
})

router.get('/:id', function(req, res, next){
  db.Link.find({
    where: {
      id: req.params.id
    }
  }).then((link) => {
    res.render('urls/show', {link:link})
  })
})

router.post('/create', function(req, res, next){
  db.Link.find({
    where: {
      url: req.body.url
    }
  }).then((link) => {
    console.log(link);
    if (link == null) {

      db.Link.create({
        url: addhttp(req.body.url),
        click: 0,
        shorted: shortid.generate()
      }).then(() => {
        res.redirect('/urls')
        // res.send(req.body.url)
      })

    } else {

      res.send('Already shorted')
    }
  })
})

router.get('/:id/delete', function(req, res, next){
  db.Link.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/urls')
  })
})

router.get('/:id/edit', function(req, res, next){
  db.Link.find({
    where: {
      id: req.params.id
    }
  }).then((link) => {
    res.render('urls/edit', {link:link})
  })
})

router.post('/:id/update', function(req, res, next){

  db.Link.update({
    url: addhttp(req.body.url)
  }, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/urls')
  })
})



module.exports = router;
