const jwt = require('jsonwebtoken')
const secretKey = 'your_secret_key' // Thay thế bằng secret key của bạn

const getTokenFrom = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

const adminMiddleware = (req, res, next) => {
  // Lấy token từ header hoặc query string hoặc cookie
  const token = req.headers['authorization'] || req.query.token || req.cookies.token || getTokenFrom(req)

  // Kiểm tra xem token có tồn tại không
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' })
  }

  try {
    // Xác minh tính hợp lệ của token và lấy thông tin payload
    const decoded = jwt.verify(token, secretKey)

    // Kiểm tra xem vai trò của người dùng có phải là admin không
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden: User is not an admin' })
    }

    // Gắn thông tin người dùng vào đối tượng request để sử dụng trong các xử lý tiếp theo
    req.user = decoded

    // Cho phép tiếp tục xử lý yêu cầu
    next()
  } catch (error) {
    // Trường hợp token không hợp lệ
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' })
  }
}

module.exports = adminMiddleware
