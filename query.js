"use strict"
let db = require('./models')

function testConnection() {
  db.sequelize
    .authenticate()
    .then(function(err) {
      console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
      console.log('Unable to connect to the database:', err);
    });
}


// User.hook('beforeValidate', function(user, options) {
//   user.mood = 'happy'
// })
//
// User.hook('afterValidate', function(user, options) {
//   return sequelize.Promise.reject("I'm afraid I can't let you do that!")
// })



db.Url.create({url: 'www.yahoo.co.id', shortener: '', clickCount: 0})
.then(function(result) {
  console.log(result.shortener);
})
