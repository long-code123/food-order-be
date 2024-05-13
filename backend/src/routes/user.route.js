const express = require('express')

const router = express.Router()
const userController = require('../controllers/user.controller')

router.get('/', async (req, res) => {
  let data = await foodController.getUsers()
  res.json(data)
})
router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router
