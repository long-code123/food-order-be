const jwt = require('jsonwebtoken')
const secret = 'your_secret_key' // Replace with your secret key

const signAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: '1h' }, (error, token) => {
      if (error) {
        reject(error)
      }
      resolve(token)
    })
  })
}
const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, payload) => {
      if (error) {
        reject(error)
      }
      resolve(payload)
    })
  })
}
module.exports = { signAccessToken, verifyAccessToken }
