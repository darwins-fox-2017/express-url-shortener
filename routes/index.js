var express = require('express');
var router = express.Router();
let db = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Link.findAll().then((links) => {
    res.render('urls/index', {links: links})
    // res.send('respond with a resource');
  })
});

router.get('/link/:shorted(*)', function(req, res, next){
  db.Link.find({
    where: {
      shorted: req.params.shorted
    }
  }).then((url) => {
    console.log(url);
    db.Link.update({
      click: url.click + 1
    }, {
      where: {
        id: url.id
      }
    }).then(() => {
      res.redirect(url.url)
    })
  })
})

module.exports = router;
