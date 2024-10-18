'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync('123456', saltRounds)

    const shippers = [
      {
        shipperName: 'Quoc',
        shipperImage: 'https://play-lh.googleusercontent.com/tkjqmHBkyJsbOZj6AOnqBJRg-CEaJBo6GalqA2gM5NhoDC4MeWWGSEHmMoNqsqjsuTl3',
        dateOfBirth: '1990-01-01',
        phoneNumber: '0901234567',
        email: 'quoc@example.com',
        address: 'Ngo Quyen',
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        shipperName: 'Thang',
        shipperImage: 'https://play-lh.googleusercontent.com/tkjqmHBkyJsbOZj6AOnqBJRg-CEaJBo6GalqA2gM5NhoDC4MeWWGSEHmMoNqsqjsuTl3',
        dateOfBirth: '1992-05-10',
        phoneNumber: '0912345678',
        email: 'thang@example.com',
        address: 'Le Huu Trac',
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        shipperName: 'Bao',
        shipperImage: 'https://play-lh.googleusercontent.com/tkjqmHBkyJsbOZj6AOnqBJRg-CEaJBo6GalqA2gM5NhoDC4MeWWGSEHmMoNqsqjsuTl3',
        dateOfBirth: '1988-09-12',
        phoneNumber: '0923456789',
        email: 'bao@example.com',
        address: 'Hai Ho',
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        shipperName: 'Nam',
        shipperImage: 'https://play-lh.googleusercontent.com/tkjqmHBkyJsbOZj6AOnqBJRg-CEaJBo6GalqA2gM5NhoDC4MeWWGSEHmMoNqsqjsuTl3',
        dateOfBirth: '1995-11-23',
        phoneNumber: '0934567890',
        email: 'nam@example.com',
        address: 'Son La',
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        shipperName: 'Hai',
        shipperImage: 'https://play-lh.googleusercontent.com/tkjqmHBkyJsbOZj6AOnqBJRg-CEaJBo6GalqA2gM5NhoDC4MeWWGSEHmMoNqsqjsuTl3',
        dateOfBirth: '1993-07-07',
        phoneNumber: '0945678901',
        email: 'hai@example.com',
        address: 'Nguyen Huu Tho',
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('shippers', shippers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('shippers', null, {});
  }
};
