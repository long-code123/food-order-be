const db = require('../../models')
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
const getAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.findAll()

    res.status(200).json(allAdmins)
  } catch (error) {
    console.error('Error getting admins:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getAdminById = async (req, res) => {
  const adminId = req.params.id

  try {
    const admin = await Admin.findByPk(adminId)

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }

    res.status(200).json(admin)
  } catch (error) {
    console.error('Error getting admin by ID:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const updateAdmin = async (req, res) => {
  try {
    const adminId = req.params.id
    const existingAdmin = await Admin.findByPk(adminId)

    if (!existingAdmin) {
      return res.status(404).json({ message: 'Không tìm thấy admin' })
    }

    if (req.body.password) {
      const passwordMatch = await bcrypt.compare(req.body.password, existingAdmin.password)
      if (!passwordMatch) {
        // Nếu mật khẩu mới không khớp với mật khẩu hiện tại, hash mật khẩu mới
        existingAdmin.password = await bcrypt.hash(req.body.password, 10)
      }
    }

    existingAdmin.adminName = req.body.adminName || existingAdmin.adminName
    existingAdmin.email = req.body.email || existingAdmin.email
    existingAdmin.role = req.body.role || existingAdmin.role

    const updatedAdmin = await existingAdmin.save()
    res.status(200).json(updatedAdmin)
  } catch (error) {
    console.error('Lỗi khi cập nhật admin:', error)
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ' })
  }
}

const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id
    const existingAdmin = await Admin.findByPk(adminId)
    if (!existingAdmin) {
      return res.status(404).json({ message: 'Admin not found' })
    }

    // Xóa món ăn khỏi cơ sở dữ liệu
    await existingAdmin.destroy()

    // Trả về thông báo thành công
    res.status(200).json({ message: 'Admin deleted successfully' })
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error deleting admin:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const adminLogin = async (req, res) => {
  try {
    const { adminName, password } = req.body

    console.log(adminName + password)

    const admin = await Admin.findOne({ where: { adminName: adminName } })

    if (!admin) {
      return res.status(401).json({ message: 'Invalid admin name' })
    }

    const passwordMatch = await bcrypt.compare(password, admin.password)

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    const token = jwt.sign(
      { adminId: admin.id, adminName: admin.adminName, email: admin.email, role: admin.role },
      secretKey,
      { expiresIn: '1h' }
    )

    // Trả về thông tin admin cùng với token
    res.json({ token, admin: { id: admin.id, adminName: admin.adminName, role: admin.role, email: admin.email } })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getCurrentAdmin = async (req, res) => {
  try {
    const admin = req.user
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }
    console.log(admin)
    res.json({ id: admin.id, adminName: admin.adminName, role: admin.role, email: admin.email })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  adminLogin,
  getCurrentAdmin
}
