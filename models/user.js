'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
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
  return User;
};