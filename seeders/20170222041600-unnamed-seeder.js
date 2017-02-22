'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Urls', [
      {url: 'www.google.com', shortener: 'www.google.com', clickCount: 0, createdAt: new Date(), updatedAt: new Date()},
      {url: 'www.gundamguy@blogspot.com', shortener: 'www.gundamguy@blogspot.com', clickCount: 0, createdAt: new Date(), updatedAt: new Date()},
      {url: 'www.facebook.com', shortener: 'www.facebook.com', clickCount: 0, createdAt: new Date(), updatedAt: new Date()},
      {url: 'www.yahoo.com', shortener: 'www.yahoo.com', clickCount: 0, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
