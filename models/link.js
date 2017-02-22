'use strict';
module.exports = function(sequelize, DataTypes) {
  var Link = sequelize.define('Link', {
    url: DataTypes.STRING,
    shorted: DataTypes.STRING,
    click: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Link;
};