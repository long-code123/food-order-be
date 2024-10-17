'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vouchers', {
      voucherId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      value: {
        type: Sequelize.DOUBLE,
        allowNull: false, 
      },
      condition: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'orders', // Tên bảng tham chiếu
          key: 'orderId', // Khóa ngoại tham chiếu đến trường orderId trong bảng orders
        },
        onUpdate: 'CASCADE', // Cập nhật khi orderId thay đổi
        onDelete: 'CASCADE', // Xóa bản ghi voucher khi order bị xóa
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
    await queryInterface.dropTable('vouchers');
  },
};
