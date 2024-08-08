import db from '@src/models'
const bcrypt = require('bcrypt')
const Shipper = db.shippers

const createShipper = async (req, res) => {
  try {
    if (!req.body.shipperName || !req.body.phoneNumber || !req.body.address || !req.body.password) {
      return res.status(400).json({ message: 'Name, phone number, address and password are required.' })
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newShipper = {
      shipperName: req.body.shipperName,
      shipperImage: req.body.shipperImage,
      dateOfBirth: req.body.dateOfBirth,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      address: req.body.address,
      password: hashedPassword
    }
    const createShipper = await Shipper.create(newShipper)
    res.status(201).json(createShipper)
    console.log('Create Successfully')
  } catch (error) {
    console.error('Error creating shipper: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const getShippers = async (req, res) => {
  try {
    const allShippers = await Shipper.findAll({
      attributes: { exclude: ['password'] } // Loại bỏ trường password
    })

    res.status(200).json(allShippers)
  } catch (error) {
    console.error('Error getting shippers: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const getShipperById = async (req, res) => {
  const shipperId = req.params.id
  try {
    const shipper = await Shipper.findByPk(shipperId, {
      attributes: { exclude: ['password'] }
    })
    if (!shipper) {
      return res.status(404).json({ message: 'Shipper not found' })
    }

    res.status(200).json(shipper)
  } catch (error) {
    console.error('Error getting Shipper by ID:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const updateShipper = async (req, res) => {
  try {
    const shipperId = req.params.id
    const existingShipper = await Shipper.findByPk(shipperId)
    if (!existingShipper) {
      return res.status(404).json({ message: 'Shipper not found' })
    }
    existingShipper.shipperName = req.body.shipperName || existingShipper.shipperName
    existingShipper.shipperImage = req.body.shipperImage || existingShipper.shipperImage
    existingShipper.dateOfBirth = req.body.dateOfBirth || existingShipper.dateOfBirth
    existingShipper.phoneNumber = req.body.phoneNumber || existingShipper.phoneNumber
    existingShipper.email = req.body.email || existingShipper.email
    existingShipper.address = req.body.address || existingShipper.address
    existingShipper.password = req.body.password || existingShipper.password

    const updateShipper = await existingShipper.save()

    res.status(200).json(updateShipper)
  } catch (error) {
    console.error('Error updating Shipper:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const deleteShipper = async (req, res) => {
  try {
    const shipperId = req.params.id
    const existingShipper = await Shipper.findByPk(shipperId)
    if (!existingShipper) {
      return res.status(404).json({ message: 'Shipper not found' })
    }

    await existingShipper.destroy()

    res.status(200).json({ message: 'Shipper deleted successfully' })
  } catch (error) {
    console.error('Error deleting Shipper: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
export default {
  createShipper,
  getShippers,
  getShipperById,
  updateShipper,
  deleteShipper
}
