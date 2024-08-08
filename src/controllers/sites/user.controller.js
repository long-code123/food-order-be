import db from '@src/models'
const bcrypt = require('bcrypt')
const User = db.users

const createUser = async (req, res) => {
  try {
    if (!req.body.userName || !req.body.phoneNumber || !req.body.address || !req.body.password) {
      return res.status(400).json({ message: 'Name, phone number, address and password are required.' })
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = {
      userName: req.body.userName,
      userImage: req.body.userImage,
      dateOfBirth: req.body.dateOfBirth,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      address: req.body.address,
      password: hashedPassword
    }
    const createUser = await User.create(newUser)
    res.status(201).json(createUser)
    console.log('Create Successfully')
  } catch (error) {
    console.error('Error creating user: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const getUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({
      attributes: { exclude: ['password'] } // Loại bỏ trường password
    })

    res.status(200).json(allUsers)
  } catch (error) {
    console.error('Error getting users: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const getUserById = async (req, res) => {
  const userId = req.params.id
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error('Error getting User by ID:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id
    const existingUser = await User.findByPk(userId)
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    existingUser.userName = req.body.userName || existingUser.userName
    existingUser.userImage = req.body.userImage || existingUser.userImage
    existingUser.dateOfBirth = req.body.dateOfBirth || existingUser.dateOfBirth
    existingUser.phoneNumber = req.body.phoneNumber || existingUser.phoneNumber
    existingUser.email = req.body.email || existingUser.email
    existingUser.address = req.body.address || existingUser.address
    existingUser.password = req.body.password || existingUser.password

    const updateUser = await existingUser.save()

    res.status(200).json(updateUser)
  } catch (error) {
    console.error('Error updating User:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id
    const existingUser = await User.findByPk(userId)
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    await existingUser.destroy()

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting User: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const updateUserByUser = async (req, res) => {
  try {
    const userId = req.params.id
    const existingUser = await User.findByPk(userId)
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    if (req.body.password) {
      const passwordMatch = await bcrypt.compare(req.body.password, existingUser.password)
      if (!passwordMatch) {
        // Nếu mật khẩu mới không khớp với mật khẩu hiện tại, hash mật khẩu mới
        existingUser.password = await bcrypt.hash(req.body.password, 10)
      }
    }
    existingUser.userName = req.body.userName || existingUser.userName
    existingUser.userImage = req.body.userImage || existingUser.userImage
    existingUser.dateOfBirth = req.body.dateOfBirth || existingUser.dateOfBirth
    existingUser.phoneNumber = req.body.phoneNumber || existingUser.phoneNumber
    existingUser.email = req.body.email || existingUser.email
    existingUser.address = req.body.address || existingUser.address

    const updateUser = await existingUser.save()

    res.status(200).json(updateUser)
  } catch (error) {
    console.error('Error updating User:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
export default {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserByUser
}
