import db from '@src/models'
const bcrypt = require('bcrypt')
const User = db.users

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({
      attributes: { exclude: ['password'] } 
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

export default {
  getUsers,
  getUserById,
}
