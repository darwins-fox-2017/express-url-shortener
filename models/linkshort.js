'use strict';
module.exports = function(sequelize, DataTypes) {
  var Linkshort = sequelize.define('Linkshort', {
    link_awal: DataTypes.STRING,
    link_short: DataTypes.STRING,
    link_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks : {
      beforeCreate: function(link, options) {
        var input = "";
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 10; i++ ){
            input += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }

        if(!/^http/.test(link.link_awal)) {
          link.link_awal = `http://${link.link_awal}`
        }

        link.link_short = input,
        link.link_count = 0

      }
    }
  });
  return Linkshort;
};
