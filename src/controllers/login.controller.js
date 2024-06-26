const jwt = require('jsonwebtoken')
const db = require('../models')
const bcrypt = require('bcrypt')
const User = db.users

// Secret key for JWT
const secretKey = 'your_secret_key'

const login = async (req, res) => {
  // const { userName, password } = req.body;
  const userName = req.body.userName
  const password = req.body.password

  console.log(userName + password)

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ where: { userName: userName } })

    if (!user) {
      return res.status(401).json({ error: 'Invalid username' })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    // Tạo mã JWT
    const token = jwt.sign({ userId: user.userId, userName: user.userName }, secretKey, { expiresIn: '1h' })

    // Gửi mã JWT về client
    res.json({ token })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = { login }
