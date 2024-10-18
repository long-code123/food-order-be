'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('123456', 10); // Mã hóa mật khẩu

    return queryInterface.bulkInsert('users', [
      {
        userName: 'Long',
        userImage: 'https://img.icons8.com/?size=48&id=zYzYv8aFrMIB&format=png',
        dateOfBirth: '1990-01-01',
        phoneNumber: '0901234561',
        email: 'long@example.com',
        address: 'Hanoi, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Huy',
        userImage: 'https://img.icons8.com/?size=48&id=4B8wLRcdFWWf&format=png',
        dateOfBirth: '1991-02-01',
        phoneNumber: '0901234562',
        email: 'huy@example.com',
        address: 'HCM City, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Quan',
        userImage: 'https://img.icons8.com/?size=48&id=95479&format=png',
        dateOfBirth: '1992-03-01',
        phoneNumber: '0901234563',
        email: 'quan@example.com',
        address: 'Danang, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Nam',
        userImage: 'https://img.icons8.com/?size=48&id=GYJ07Kttrdbo&format=png',
        dateOfBirth: '1993-04-01',
        phoneNumber: '0901234564',
        email: 'nam@example.com',
        address: 'Hue, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Cuong',
        userImage: 'https://img.icons8.com/?size=48&id=80976&format=png',
        dateOfBirth: '1994-05-01',
        phoneNumber: '0901234565',
        email: 'cuong@example.com',
        address: 'Can Tho, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Hoang',
        userImage: 'https://img.icons8.com/?size=100&id=105005&format=png',
        dateOfBirth: '1995-06-01',
        phoneNumber: '0901234566',
        email: 'hoang@example.com',
        address: 'Hai Phong, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Nghia',
        userImage: 'https://img.icons8.com/?size=48&id=120024&format=png',
        dateOfBirth: '1996-07-01',
        phoneNumber: '0901234567',
        email: 'nghia@example.com',
        address: 'Vung Tau, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Dat',
        userImage: 'https://img.icons8.com/?size=48&id=CguxEAjnaVhI&format=png',
        dateOfBirth: '1997-08-01',
        phoneNumber: '0901234568',
        email: 'dat@example.com',
        address: 'Nha Trang, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Trang',
        userImage: 'https://img.icons8.com/?size=100&id=Cc2eG2LeIf6r&format=png',
        dateOfBirth: '1998-09-01',
        phoneNumber: '0901234569',
        email: 'trang@example.com',
        address: 'Quang Ninh, Vietnam',
        password: hashedPassword
      },
      {
        userName: 'Tuan',
        userImage: 'https://img.icons8.com/?size=48&id=12833&format=png',
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
