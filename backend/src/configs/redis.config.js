require('dotenv').config()
process.env.PORT

module.exports = {
  redis: {
    host: '172.19.0.4',
    port: 6379,
    password: 'nguyenbalong' // Nếu Redis có mật khẩu
  }
}
