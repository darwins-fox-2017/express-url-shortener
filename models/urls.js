'use strict';
module.exports = function(sequelize, DataTypes) {
  var Urls = sequelize.define('Urls', {
    url: DataTypes.STRING,
    short_url: DataTypes.STRING,
    count_url: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks:{
      beforeCreate:function(link, option){
        let unique = "ASBCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrsstuvwxyz0123456789"
        let urlUnique = ""

        if (!/^http/.test(link.url)) {
          link.url = `http://${link.url}`
        }

        for (let i = 0; i < 7; i++) {
          urlUnique += unique[Math.floor(Math.random() * unique.length )]
        }

        link.short_url = urlUnique
        link.count_url = 0
      }
    }
  });
  return Urls;
};
