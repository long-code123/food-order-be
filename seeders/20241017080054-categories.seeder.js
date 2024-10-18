'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        categoryName: 'Pizza',
        categoryImage: 'https://img.icons8.com/?size=48&id=80764&format=png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Burger',
        categoryImage: 'https://img.icons8.com/?size=48&id=12869&format=png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Noodles',
        categoryImage: 'https://img.icons8.com/?size=100&id=2t0RMdi8ORb5&format=png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Sandwich',
        categoryImage: 'https://img.icons8.com/?size=48&id=HwIEsEmuCUlw&format=png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Salad',
        categoryImage: 'https://img.icons8.com/?size=48&id=zphNWHGZfV0i&format=png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Pasta',
        categoryImage: 'https://img.icons8.com/?size=48&id=gPZBYc1Ds8ns&format=png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Rice',
        categoryImage: 'https://img.icons8.com/?size=48&id=0bX4Bs8ogwUu&format=png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Dessert',
        categoryImage: 'https://img.icons8.com/?size=48&id=yfksegRPDAYS&format=png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Soup',
        categoryImage: 'https://img.icons8.com/?size=48&id=BewN23wCh-il&format=png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Drink',
        categoryImage: 'https://img.icons8.com/?size=48&id=g4ya0t-L-Ui_&format=png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
