'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reviewfoods', {
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
        onDelete: 'CASCADE', // Xóa bản ghi reviewfood khi user bị xóa
      },
      foodId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'foods', // Tên bảng tham chiếu
          key: 'foodId', // Khóa ngoại tham chiếu đến trường foodId trong bảng foods
        },
        onUpdate: 'CASCADE', // Cập nhật khi foodId thay đổi
        onDelete: 'CASCADE', // Xóa bản ghi reviewfood khi food bị xóa
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
    await queryInterface.dropTable('reviewfoods');
  },
};
