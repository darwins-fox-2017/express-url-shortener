'use strict';
module.exports = function(sequelize, DataTypes) {
  var Url = sequelize.define('Url', {
    url_origin: DataTypes.STRING,
    url_shorten: DataTypes.STRING,
    click_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks :{
      beforeCreate : function(model){

        if (!/^http/g.test(model.url_origin)) {
          model.url_origin = `http://${model.url_origin}`
        }

        let alphaNum = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

        model.url_shorten = ''
        for(let i=0; i<6; i++){
          model.url_shorten += alphaNum[Math.floor(Math.random()*alphaNum.length)]
        }
        model.click_count = 0
      }
    }
  });
  return Url;
};
