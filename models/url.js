'use strict';
module.exports = function(sequelize, DataTypes) {
  var Url = sequelize.define('Url', {
    url: DataTypes.STRING,
    shortener: DataTypes.STRING,
    clickCount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: {
      beforeCreate: function(url, options) {
       var randomText = "";
       var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
       for( var i = 0; i < 5; i++ ) {
         randomText += possible.charAt(Math.floor(Math.random() * possible.length));
       }
      url.shortener = `www.hoax${randomText}.com`
      }
    }
  });
  return Url;
};
