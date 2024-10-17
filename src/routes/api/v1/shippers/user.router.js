import express from 'express'
import userController from '@src/controllers/api/shippers/user.controller'

const router = express.Router()


router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)


export default router
