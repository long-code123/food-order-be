const db = require('../models')
const Payment = db.payment

const createPayment = async (req, res) => {
  try {
    if (!req.body.paymentDate || !req.body.totalAmount || !req.body.paymentMethod || !req.body.paymentStatus) {
      return res.status(400).json({ message: 'Information of payment is required.' })
    }
    const newPayment = {
      paymentDate: req.body.paymentDate,
      totalAmount: req.body.totalAmount,
      paymentMethod: req.body.paymentMethod,
      paymentStatus: req.body.paymentStatus,
      storeId: req.body.storeId || null,
      orderId: req.body.orderId || null
    }
    const createdPayment = await Payment.create(newPayment)
    res.status(201).json(createdPayment)
    console.log('Create Successfully')
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error creating payment:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const getPayments = async (req, res) => {
  try {
    const allPayments = await Payment.findAll()

    res.status(200).json(allPayments)
  } catch (error) {
    console.error('Error getting payments:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getPaymentById = async (req, res) => {
  const paymentId = req.params.id

  try {
    const payment = await Payment.findByPk(paymentId)

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' })
    }

    res.status(200).json(payment)
  } catch (error) {
    console.error('Error getting payment by ID:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.id
    const existingPayment = await Payment.findByPk(paymentId)
    if (!existingPayment) {
      return res.status(404).json({ message: 'Payment not found' })
    }
    existingPayment.paymentDate = req.body.paymentDate || existingPayment.paymentDate
    existingPayment.totalAmount = req.body.totalAmount || existingPayment.totalAmount
    existingPayment.paymentMethod = req.body.paymentMethod || existingPayment.paymentMethod
    existingPayment.paymentStatus = req.body.paymentStatus || existingPayment.paymentStatus
    existingPayment.storeId = req.body.storeId || existingPayment.storeId
    existingPayment.orderId = req.body.orderId || existingPayment.orderId
    const updatedPayment = await existingPayment.save()
    res.status(200).json(updatedPayment)
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error updating payment:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id
    const existingPayment = await Payment.findByPk(paymentId)
    if (!existingPayment) {
      return res.status(404).json({ message: 'Payment not found' })
    }

    // Xóa món ăn khỏi cơ sở dữ liệu
    await existingPayment.destroy()

    // Trả về thông báo thành công
    res.status(200).json({ message: 'Payment deleted successfully' })
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error deleting payment:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getPaymentsByStore = async (req, res) => {
  try {
    const storeId = req.params.id
    if (!storeId) {
      return res.status(400).json({ message: 'Invalid shipperId' })
    }
    const payments = await Payment.findAll({ where: { storeId } })
    if (payments.length === 0) {
      return res.status(404).json({ message: 'No Payments for store' })
    }
    res.status(200).json(payments)
  } catch {
    console.error('Error fetching Payments by store: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentsByStore
}
