'use strict';
module.exports = function(sequelize, DataTypes) {
  var Shortener = sequelize.define('Shortener', {
    url: DataTypes.STRING,
    shortener_link: DataTypes.STRING,
    click: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: {
      beforeCreate: function(link, options) {
        var input = "";
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 4; i++ ){
            input += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }

        if(!/^http/.test(link.url)) {
          link.url = `http://${link.url}`
        }

        link.shortener_link = input,
        link.click = 0
      }
    }
  });
  return Shortener;
};
