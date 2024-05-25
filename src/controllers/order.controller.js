const db = require('../models')
const Order = db.orders

const createOrder = async (req, res) => {
  try {
    if (!req.body.deliveryTime) {
      return res.status(400).json({ message: 'Order delivery Time is required.' })
    }
    const newOrder = {
      deliveryTime: req.body.deliveryTime,
      userId: req.body.userId || null,
      shipperId: req.body.shipperId || null
    }
    const createdOrder = await Order.create(newOrder)
    res.status(201).json(createdOrder)
    console.log('Create Successfully')
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error creating order:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const getOrders = async (req, res) => {
  try {
    const allOrders = await Order.findAll()

    res.status(200).json(allOrders)
  } catch (error) {
    console.error('Error getting orders:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getOrderById = async (req, res) => {
  const orderId = req.params.id

  try {
    const order = await Order.findByPk(orderId)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.status(200).json(order)
  } catch (error) {
    console.error('Error getting order by ID:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id
    const existingOrder = await Order.findByPk(orderId)
    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' })
    }
    existingOrder.deliveryTime = req.body.deliveryTime || existingOrder.deliveryTime
    existingOrder.userId = req.body.userId || existingOrder.userId
    existingOrder.shipperId = req.body.shipperId || existingOrder.shipperId
    const updatedOrder = await existingOrder.save()
    res.status(200).json(updatedOrder)
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error updating order:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id
    const existingOrder = await Order.findByPk(orderId)
    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Xóa món ăn khỏi cơ sở dữ liệu
    await existingOrder.destroy()

    // Trả về thông báo thành công
    res.status(200).json({ message: 'Order deleted successfully' })
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error deleting order:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
}
