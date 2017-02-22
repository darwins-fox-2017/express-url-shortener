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
      beforeCreate: function(link, options) {
        var randomText = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i = 0; i < 5; i++ ) {
          randomText += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        if(!/^http/.test(link.url)){
          link.url = `http://${link.url}`
        }
        link.shortener = `${randomText}`
        link.clickCount = 0
      }
    }
  });
  return Url;
};
