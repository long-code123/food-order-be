const express = require('express')

const router = express.Router()
const storeController = require('../controllers/store.controller')

router.get('/', async (req, res) => {
  let data = await storeController.getStores()
  res.json(data)
})
router.get('/:id', storeController.getStoreById)
router.post('/', storeController.createStore)
router.put('/:id', storeController.updateStore)
router.delete('/:id', storeController.deleteStore)

module.exports = router
