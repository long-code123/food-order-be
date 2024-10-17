import db from "@src/models"
const bcrypt = require('bcrypt')
const Shipper = db.shippers
const jwt = require('jsonwebtoken')

const secretKey = 'your_secret_key'

const loginShipper = async (req, res) => {
  const shipperName = req.body.shipperName
  const password = req.body.password

  console.log(shipperName + password)

  try {
    // Tìm shipper trong cơ sở dữ liệu
    const shipper = await Shipper.findOne({ where: { shipperName: shipperName } })

    if (!shipper) {
      return res.status(401).json({ error: 'Invalid username' })
    }
    const passwordMatch = await bcrypt.compare(password, shipper.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    // Tạo mã JWT cho shipper
    const token = jwt.sign(
      {
        shipperId: shipper.shipperId,
        shipperName: shipper.shipperName,
        phoneNumber: shipper.phoneNumber,
        email: shipper.email,
        address: shipper.address
      },
      secretKey,
      { expiresIn: '1h' }
    )

    // Gửi mã JWT về client
    res.json({
      token,
      shipper: {
        shipperId: shipper.shipperId,
        shipperName: shipper.shipperName,
        phoneNumber: shipper.phoneNumber,
        email: shipper.email,
        address: shipper.address
      }
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const getCurrentShipper = async (req, res) => {
  try {
    const shipper = req.shipper
    console.log(shipper)
    if (!shipper) {
      return res.status(404).json({ message: 'Shipper not found' })
    }
    res.json({
      shipperId: shipper.shipperId,
      shipperName: shipper.shipperName,
      phoneNumber: shipper.phoneNumber,
      email: shipper.email,
      address: shipper.address
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

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
module.exports = {
  loginShipper,
  getCurrentShipper,
  createShipper,
  updateShipper,
  deleteShipper
}
