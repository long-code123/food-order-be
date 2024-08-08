const jwt = require('jsonwebtoken')

const secretKey = 'your_secret_key'
const getTokenFrom = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

const authMiddleware = (req, res, next) => {
  // Lấy token từ header hoặc query string hoặc cookie
  const token =
    req.headers['authorization'].split(' ')[1] ||
    req.query.token.split(' ')[1] ||
    req.cookies.token.split(' ')[1] ||
    getTokenFrom(req)
  // Log token đã được lấy
  console.log(req.headers['authorization'].split(' ')[1])
  console.log('Token:', token)

  // Kiểm tra xem token có tồn tại không
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' })
  }

  try {
    // Xác minh tính hợp lệ của token và lấy thông tin payload
    const decoded = jwt.verify(token, secretKey)

    // Gắn thông tin người dùng vào đối tượng request để sử dụng trong các xử lý tiếp theo
    req.user = decoded

    // Cho phép tiếp tục xử lý yêu cầu
    next()
  } catch (error) {
    // Trường hợp token không hợp lệ
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' })
  }
}

module.exports = authMiddleware
