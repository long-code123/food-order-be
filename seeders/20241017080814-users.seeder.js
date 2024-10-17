'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('123456', 10); // Mã hóa mật khẩu

    return queryInterface.bulkInsert('users', [
      {
        userName: 'Long',
        userImage: 'long.jpg',
        dateOfBirth: '1990-01-01',
        phoneNumber: '0901234561',
        email: 'long@example.com',
        address: 'Hanoi, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Huy',
        userImage: 'huy.jpg',
        dateOfBirth: '1991-02-01',
        phoneNumber: '0901234562',
        email: 'huy@example.com',
        address: 'HCM City, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Quan',
        userImage: 'quan.jpg',
        dateOfBirth: '1992-03-01',
        phoneNumber: '0901234563',
        email: 'quan@example.com',
        address: 'Danang, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Nam',
        userImage: 'nam.jpg',
        dateOfBirth: '1993-04-01',
        phoneNumber: '0901234564',
        email: 'nam@example.com',
        address: 'Hue, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Cuong',
        userImage: 'cuong.jpg',
        dateOfBirth: '1994-05-01',
        phoneNumber: '0901234565',
        email: 'cuong@example.com',
        address: 'Can Tho, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Hoang',
        userImage: 'hoang.jpg',
        dateOfBirth: '1995-06-01',
        phoneNumber: '0901234566',
        email: 'hoang@example.com',
        address: 'Hai Phong, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Nghia',
        userImage: 'nghia.jpg',
        dateOfBirth: '1996-07-01',
        phoneNumber: '0901234567',
        email: 'nghia@example.com',
        address: 'Vung Tau, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Dat',
        userImage: 'dat.jpg',
        dateOfBirth: '1997-08-01',
        phoneNumber: '0901234568',
        email: 'dat@example.com',
        address: 'Nha Trang, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Trang',
        userImage: 'trang.jpg',
        dateOfBirth: '1998-09-01',
        phoneNumber: '0901234569',
        email: 'trang@example.com',
        address: 'Quang Ninh, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Tuan',
        userImage: 'tuan.jpg',
        dateOfBirth: '1999-10-01',
        phoneNumber: '0901234570',
        email: 'tuan@example.com',
        address: 'Phu Quoc, Vietnam',
        password: hashedPassword
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
