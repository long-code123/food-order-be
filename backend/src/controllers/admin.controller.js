const db = require('../models')
const Admin = db.admin
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secretKey = 'your_secret_key' // Thay thế bằng secret key của bạn

const createAdmin = async (req, res) => {
  try {
    if (!req.body.adminName || !req.body.password || !req.body.role) {
      return res.status(400).json({ message: 'Name, password, role are required.' })
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newAdmin = {
      adminName: req.body.adminName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role
    }
    const createAdmin = await Admin.create(newAdmin)
    res.status(201).json(createAdmin)
    console.log('Create Successfully')
  } catch (error) {
    console.error('Error creating admin: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const adminLogin = async (req, res) => {
  try {
    const { adminName, password } = req.body

    const admin = await Admin.findOne({ where: { adminName: adminName } })

    if (!admin) {
      return res.status(401).json({ message: 'Invalid admin name' })
    }

    const passwordMatch = await bcrypt.compare(password, admin.password)

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    const token = jwt.sign({ adminId: admin.id, role: admin.role }, secretKey, { expiresIn: '1h' })
    // Thêm token vào header "Authorization" của phản hồi
    // res.setHeader('Authorization', `Bearer ${token}`)

    // Trả về phản hồi với token
    res.json({ token })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

function dashboard(req, res) {
  res.json({ success: true, message: 'Dashboard' + req.admin.role, user: req.admin })
}

module.exports = {
  adminLogin,
  dashboard,
  createAdmin
}
