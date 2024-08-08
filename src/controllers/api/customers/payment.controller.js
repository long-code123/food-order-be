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

module.exports = {
  getPaymentById,
  createPayment
}
