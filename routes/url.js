'use strict'
var express = require('express');
var router = express.Router();
var db = require('../models')

// htttp:localhost:3000/url
router.get('/', function(req, res, next) {
  db.Url.findAll({order: '"id" ASC'})
  .then(function(resultUrl) {
    res.render('url/index', { dataUrl: resultUrl });
  })
});

// ADD
router.get('/new', function(req, res, next) {
  res.render('url/new', { dataUrl: 'resultUrl' });
});

router.post('/new', function(req, res, next) {
  db.Url.create({url: req.body.url, shortener: '', clickCount: 0 })
  .then(function(result) {
    // setelah selesai insert data, render halaman kembali ke index
    res.redirect('/url')
    console.log(`data berhasil diasukkan`);
  })
});

// DELETE
router.get('/:urlId/delete', function(req, res, next) {
  console.log(`oke coy`);
  let id = req.params.urlId;
  db.Url.findById(id).then(function(result) {
    return result.destroy().then(function() {
      res.redirect('/url')
      console.log(`kucing`);
    })
  })
});

// /url/<%= dataUrl[i].id %>/redirect
router.get('/:urlId/redirect', function(req, res, next) {
  db.Url.findById(req.params.urlId).then(function(result) {

    return result.update({ clickCount: `${Number(result.clickCount) + 1}` }).then(function() {
      res.redirect(`https://${result.url}`)
    })
  })
});




module.exports = router;

// router.get('/:urlId/redirect', function(req, res, next) {
//   db.Url.findById(req.params.urlId)
//     .then(function(result) {
//       result.update({ clickCount: ${result.clickCount + 1} })
//         .then(function(result) {
//           res.redirect(`https://${result.url}`)
//         })
//     })
//   })
// });
