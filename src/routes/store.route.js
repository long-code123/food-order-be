const express = require('express')
const router = express.Router()
const storeController = require('../controllers/store.controller')
const authorizeMiddleware = require('../middlewares/authorizeMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, authorizeMiddleware(['super admin', 'admin']), storeController.getStores)
router.get('/:id', authMiddleware, authorizeMiddleware(['super admin', 'admin']), storeController.getStoreById)
router.post('/', authMiddleware, authorizeMiddleware(['super admin']), storeController.createStore)
router.put('/:id', authMiddleware, authorizeMiddleware(['super admin']), storeController.updateStore)
router.delete('/:id', authMiddleware, authorizeMiddleware(['super admin']), storeController.deleteStore)

module.exports = router
