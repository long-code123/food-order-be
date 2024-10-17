'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('foodquantities', {
      foodQuantityId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'orders', // Tên bảng tham chiếu
          key: 'orderId', // Khóa ngoại tham chiếu đến trường orderId trong bảng orders
        },
        onUpdate: 'CASCADE', // Cập nhật khi orderId thay đổi
        onDelete: 'CASCADE', // Xóa bản ghi foodquantity khi order bị xóa
      },
      foodId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'foods', // Tên bảng tham chiếu
          key: 'foodId', // Khóa ngoại tham chiếu đến trường foodId trong bảng foods
        },
        onUpdate: 'CASCADE', // Cập nhật khi foodId thay đổi
        onDelete: 'CASCADE', // Xóa bản ghi foodquantity khi food bị xóa
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false, 
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('foodquantities');
  },
};
