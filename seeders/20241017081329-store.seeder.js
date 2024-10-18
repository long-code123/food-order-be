'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('stores', [
      {
        storeName: 'Sip Spot',
        storeImage: 'https://img.icons8.com/?size=100&id=3De0glmeu2Xn&format=png', 
        address: 'Ong Ich Khiem',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Chill Bar',
        storeImage: 'https://img.icons8.com/?size=64&id=LFiG3hXtoOyH&format=png',
        address: 'Duong Dinh Nghe',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Fresh Hub',
        storeImage: 'https://img.icons8.com/?size=48&id=IF7fgGGqIJV9&format=png',
        address: 'Hai Phong',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Brew Café',
        storeImage: 'dhttps://img.icons8.com/?size=48&id=nLqOhOt4ZU50&format=png',
        address: 'Le Thanh Nghi',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Cool Sips',
        storeImage: 'https://img.icons8.com/?size=100&id=a64-9iN6Xz22&format=png',
        address: 'Phan Chau Trinh',
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Juice Box',
        storeImage: 'https://img.icons8.com/?size=100&id=K6OEZX8IFXSf&format=png',
        address: 'Trung Nu Vuong',
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Bean Stop',
        storeImage: 'https://img.icons8.com/?size=100&id=aThCJ8xbKzpB&format=png',
        address: 'Hung Vuong',
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Zest Bar',
        storeImage: 'https://img.icons8.com/?size=100&id=aThCJ8xbKzpB&format=png',
        address: 'Le Duan',
        userId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Squeeze',
        storeImage: 'https://img.icons8.com/?size=100&id=XwWjVXhMRcxY&format=png',
        address: 'Nguyen Chi Thanh',
        userId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Sip & Go',
        storeImage: 'https://img.icons8.com/?size=100&id=WqCljvCjD64Q&format=png',
        address: 'Ton Dan',
        userId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('stores', null, {});
  }
};
