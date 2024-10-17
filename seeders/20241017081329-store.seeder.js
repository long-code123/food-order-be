'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('stores', [
      {
        storeName: 'Sip Spot',
        storeImage: 'default_image_url', // Thay thế bằng URL hình ảnh thực tế nếu có
        address: 'Ong Ich Khiem',
        userId: 1, // Thay đổi userId tương ứng với các user mà bạn đã tạo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Chill Bar',
        storeImage: 'default_image_url',
        address: 'Duong Dinh Nghe',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Fresh Hub',
        storeImage: 'default_image_url',
        address: 'Hai Phong',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Brew Café',
        storeImage: 'default_image_url',
        address: 'Le Thanh Nghi',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Cool Sips',
        storeImage: 'default_image_url',
        address: 'Phan Chau Trinh',
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Juice Box',
        storeImage: 'default_image_url',
        address: 'Trung Nu Vuong',
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Bean Stop',
        storeImage: 'default_image_url',
        address: 'Hung Vuong',
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Zest Bar',
        storeImage: 'default_image_url',
        address: 'Le Duan',
        userId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Squeeze',
        storeImage: 'default_image_url',
        address: 'Nguyen Chi Thanh',
        userId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        storeName: 'Sip & Go',
        storeImage: 'default_image_url',
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
