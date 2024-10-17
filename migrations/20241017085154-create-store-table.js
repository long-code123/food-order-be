'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stores', {
      storeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      storeName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      storeImage: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Tên bảng tham chiếu
          key: 'userId', // Khóa ngoại tham chiếu đến trường userId trong bảng users
        },
        onUpdate: 'CASCADE', // Cập nhật khi userId thay đổi
        onDelete: 'SET NULL', // Đặt userId thành NULL nếu bản ghi user bị xóa
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
    await queryInterface.dropTable('stores');
  },
};
