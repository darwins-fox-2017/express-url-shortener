'use strict';
let hash = require('hashids')
let crypto = require('crypto')


module.exports = function(sequelize, DataTypes) {
  var link = sequelize.define('link', {
    link: DataTypes.STRING,
    short: DataTypes.STRING,
    click: {type: DataTypes.INTEGER, defaultValue: 0}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

      },
      hashShort: function() {
        return new Promise(function(res, rej, next) {
          link.count().then(function(total) {
            let hashId = new hash()
            let hashed = hashId.encode(total)
            res(hashed)
          })
        })
      }
    },
    hooks: {
      beforeCreate: function (url) {
        // Do other stuf
        url.short = crypto.randomBytes(2).toString('hex')
      }
    },
  });
  return link;
};
