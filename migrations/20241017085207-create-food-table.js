'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('foods', {
      foodId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      foodName: {
        type: Sequelize.STRING,
        allowNull: false, // Bắt buộc nhập
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false, // Bắt buộc nhập
      },
      rating: {
        type: Sequelize.DOUBLE,
      },
      description: {
        type: Sequelize.STRING,
      },
      foodImage: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories', // Tên bảng tham chiếu
          key: 'categoryId', // Khóa ngoại tham chiếu đến trường categoryId trong bảng categories
        },
        onUpdate: 'CASCADE', // Cập nhật khi categoryId thay đổi
        onDelete: 'SET NULL', // Đặt categoryId thành NULL nếu bản ghi category bị xóa
      },
      storeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'stores', // Tên bảng tham chiếu
          key: 'storeId', // Khóa ngoại tham chiếu đến trường storeId trong bảng stores
        },
        onUpdate: 'CASCADE', // Cập nhật khi storeId thay đổi
        onDelete: 'SET NULL', // Đặt storeId thành NULL nếu bản ghi store bị xóa
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
    await queryInterface.dropTable('foods');
  },
};
