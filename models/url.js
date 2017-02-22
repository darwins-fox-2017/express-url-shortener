'use strict';
module.exports = function(sequelize, DataTypes) {
  var Url = sequelize.define('Url', {
    url: DataTypes.STRING,
    short_url: DataTypes.STRING,
    click_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: {
        beforeCreate:function(url, option) {
          var text = ""
          var unique = "ASBCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrsstuvwxyz0123456789"
          for (let i = 0; i <= 4; i++) {
            text += unique[Math.floor(Math.random()*unique.length)]
            url.click_count = 0
          }
          url.short_url   = text  
        }
      }
  });
  return Url;
};
