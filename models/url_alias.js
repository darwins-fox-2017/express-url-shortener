'use strict';
module.exports = function(sequelize, DataTypes) {
  var Url_alias = sequelize.define('Url_alias', {
    ori_url: DataTypes.STRING,
    shorten_url: DataTypes.STRING,
    is_clicked: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
      }
    }
  });
  return Url_alias;
};
