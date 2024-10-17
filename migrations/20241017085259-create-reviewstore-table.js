'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reviewstores', {
      reviewId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Tự động tăng cho ID của đánh giá
      },
      rating: {
        type: Sequelize.DOUBLE,
        allowNull: false, // Bắt buộc nhập
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true, // Có thể để trống
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Tên bảng tham chiếu
          key: 'userId', // Khóa ngoại tham chiếu đến trường userId trong bảng users
        },
        onUpdate: 'CASCADE', // Cập nhật khi userId thay đổi
        onDelete: 'CASCADE', // Xóa bản ghi reviewstore khi user bị xóa
      },
      storeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'stores', // Tên bảng tham chiếu
          key: 'storeId', // Khóa ngoại tham chiếu đến trường storeId trong bảng stores
        },
        onUpdate: 'CASCADE', // Cập nhật khi storeId thay đổi
        onDelete: 'CASCADE', // Xóa bản ghi reviewstore khi store bị xóa
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
    await queryInterface.dropTable('reviewstores');
  },
};
