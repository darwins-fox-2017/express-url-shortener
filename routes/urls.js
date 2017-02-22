var express = require('express');
var router = express.Router();

let db = require('../models')
var shortid = require('shortid');

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

router.post('/create', function(req, res, next){
  db.Link.find({
    where: {
      url: req.body.url
    }
  }).then((link) => {
    console.log(link);
    if (link == null) {
      db.Link.create({
        url: req.body.url,
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



module.exports = router;
