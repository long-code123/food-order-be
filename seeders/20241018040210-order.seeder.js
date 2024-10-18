'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tạo 5 đơn hàng
    const orders = await queryInterface.bulkInsert(
      'orders',
      [
        {
          deliveryTime: faker.date.future(),
          userId: 1,
          shipperId: 1,
          status: 'done',
          storeId: 2,
          createdAt: new Date('2024-08-20T00:00:00Z'),
          updatedAt: new Date('2024-08-25T00:00:00Z')
        },
        {
          deliveryTime: faker.date.future(),
          userId: 2,
          shipperId: 2,
          status: 'done',
          storeId: 1,
          createdAt: new Date('2024-09-20T00:00:00Z'),
          updatedAt: new Date('2024-09-23T00:00:00Z')
        },
        {
          deliveryTime: faker.date.future(),
          userId: 3,
          shipperId: 3,
          status: 'done',
          storeId: 3,
          createdAt: new Date('2024-09-20T00:00:00Z'),
          updatedAt: new Date('2024-09-22T00:00:00Z')
        },
        {
          deliveryTime: faker.date.future(),
          userId: 4,
          shipperId: 4,
          status: 'done',
          storeId: 4,
          createdAt: new Date('2024-09-20T00:00:00Z'),
          updatedAt: new Date('2024-09-21T00:00:00Z')
        },
        {
          deliveryTime: faker.date.future(),
          userId: 5,
          shipperId: 5,
          status: 'done',
          storeId: 5,
          createdAt: new Date('2024-09-20T00:00:00Z'),
          updatedAt: new Date('2024-09-25T00:00:00Z')
        },
        {
          deliveryTime: faker.date.future(),
          userId: 6,
          shipperId: 5,
          status: 'done',
          storeId: 1,
          createdAt: new Date('2024-09-20T00:00:00Z'),
          updatedAt: new Date('2024-09-25T00:00:00Z')
        },
        {
          deliveryTime: faker.date.future(),
          userId: 7,
          shipperId: 5,
          status: 'done',
          storeId: 1,
          createdAt: new Date('2024-09-20T00:00:00Z'),
          updatedAt: new Date('2024-09-25T00:00:00Z')
        },
        {
          deliveryTime: faker.date.future(),
          userId: 8,
          shipperId: 5,
          status: 'done',
          storeId: 6,
          createdAt: new Date('2024-09-20T00:00:00Z'),
          updatedAt: new Date('2024-09-24T00:00:00Z')
        },
        {
          deliveryTime: faker.date.future(),
          userId: 8,
          shipperId: 5,
          status: 'done',
          storeId: 1,
          createdAt: new Date('2024-09-20T00:00:00Z'),
          updatedAt: new Date('2024-09-30T00:00:00Z')
        },
        {
          deliveryTime: faker.date.future(),
          userId: 9,
          shipperId: 5,
          status: 'done',
          storeId: 7,
          createdAt: new Date('2024-09-20T00:00:00Z'),
          updatedAt: new Date('2024-09-27T00:00:00Z')
        },
        {
          deliveryTime: faker.date.future(),
          userId: 10,
          shipperId: 5,
          status: 'done',
          storeId: 1,
          createdAt: new Date('2024-09-20T00:00:00Z'),
          updatedAt: new Date('2024-09-26T00:00:00Z')
        }
      ],
      { returning: true }
    );

    const foodQuantities = [];

    for (const order of orders) {
      for (let i = 0; i < 3; i++) { // Mỗi order có 3 món ăn
        foodQuantities.push({
          orderId: order.orderId, // Chú ý sử dụng `orderId` thay vì `id`
          foodId: faker.number.int({ min: 1, max: 100 }), // foodId từ 1 đến 100
          quantity: faker.number.int({ min: 1, max: 5 }), // Số lượng ngẫu nhiên từ 1 đến 5
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    return queryInterface.bulkInsert('foodquantities', foodQuantities);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('foodquantities', null, {});
    await queryInterface.bulkDelete('orders', null, {});
  }
};