const db = require('../models')
const Voucher = db.voucher

const createVoucher = async (req, res) => {
  try {
    if (!req.body.description || !req.body.value) {
      return res.status(400).json({ message: 'Voucher name and address are required.' })
    }
    const newVoucher = {
      description: req.body.description,
      value: req.body.value,
      conditition: req.body.conditition,
      orderId: req.body.orderId || null
    }
    const createdVoucher = await Voucher.create(newVoucher)
    res.status(201).json(createdVoucher)
    console.log('Create Successfully')
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error creating voucher:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const getVouchers = async (req, res) => {
  try {
    const allVouchers = await Voucher.findAll()

    res.status(200).json(allVouchers)
  } catch (error) {
    console.error('Error getting vouchers:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getVoucherById = async (req, res) => {
  const voucherId = req.params.id

  try {
    const voucher = await Voucher.findByPk(voucherId)

    if (!voucher) {
      return res.status(404).json({ message: 'Voucher not found' })
    }

    res.status(200).json(voucher)
  } catch (error) {
    console.error('Error getting voucher by ID:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const updateVoucher = async (req, res) => {
  try {
    const voucherId = req.params.id
    const existingVoucher = await Voucher.findByPk(voucherId)
    if (!existingVoucher) {
      return res.status(404).json({ message: 'Voucher not found' })
    }
    existingVoucher.description = req.body.description || existingVoucher.description
    existingVoucher.value = req.body.value || existingVoucher.value
    existingVoucher.conditition = req.body.conditition || existingVoucher.conditition
    existingVoucher.orderId = req.body.orderId || existingVoucher.orderId

    const updatedVoucher = await existingVoucher.save()
    res.status(200).json(updatedVoucher)
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error updating voucher:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const deleteVoucher = async (req, res) => {
  try {
    const voucherId = req.params.id
    const existingVoucher = await Voucher.findByPk(voucherId)
    if (!existingVoucher) {
      return res.status(404).json({ message: 'Voucher not found' })
    }

    // Xóa món ăn khỏi cơ sở dữ liệu
    await existingVoucher.destroy()

    // Trả về thông báo thành công
    res.status(200).json({ message: 'Voucher deleted successfully' })
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error deleting voucher:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
module.exports = {
  getVouchers,
  getVoucherById,
  createVoucher,
  updateVoucher,
  deleteVoucher
}
