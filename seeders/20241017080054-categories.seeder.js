'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        categoryName: 'Pizza',
        categoryImage: 'pizza.jpg',  // Bạn có thể đặt tên ảnh hoặc URL tương ứng
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Burger',
        categoryImage: 'burger.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Noodles',
        categoryImage: 'noodles.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Sandwich',
        categoryImage: 'sandwich.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Salad',
        categoryImage: 'salad.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Pasta',
        categoryImage: 'pasta.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Rice',
        categoryImage: 'rice.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Dessert',
        categoryImage: 'dessert.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Soup',
        categoryImage: 'soup.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Drink',
        categoryImage: 'drink.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
