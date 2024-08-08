import db from '@src/models'
const Order = db.orders
const FoodQuantity = db.foodquantity

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
    const order = await Order.findOne({
      where: { orderId: orderId },
      include: [
        {
          model: FoodQuantity,
          as: 'items',
          include: [
            {
              model: db.foods,
              as: 'food'
            }
          ]
        }
      ]
    })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.status(200).json(order)
  } catch (error) {
    console.error('Error getting order by ID:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const updateStatusOrder = async (req, res) => {
  try {
    const orderId = req.params.id
    const { status } = req.body

    // Kiểm tra nếu không có status trong body của request
    if (!status) {
      return res.status(400).json({ message: 'Status is required' })
    }

    // Tìm order theo orderId
    const existingOrder = await Order.findByPk(orderId)
    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Cập nhật trường status của order
    existingOrder.status = status
    const updatedOrder = await existingOrder.save()

    res.status(200).json(updatedOrder)
  } catch (error) {
    console.error('Error updating order status:', error)
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

const getOrderByShipper = async (req, res) => {
  try {
    const shipperId = req.params.id
    if (!shipperId) {
      return res.status(400).json({ message: 'Invalid shipperId' })
    }

    const orders = await Order.findAll({
      where: { shipperId },
      include: [
        {
          model: FoodQuantity,
          as: 'items',
          include: [
            {
              model: db.foods,
              as: 'food'
            }
          ]
        }
      ]
    })

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No order for shipper' })
    }

    res.status(200).json(orders)
  } catch (error) {
    console.error('Error fetching Orders by shipper:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getOrderByUser = async (req, res) => {
  try {
    const userId = req.params.id
    if (!userId) {
      return res.status(400).json({ message: 'Invalid userId' })
    }

    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: FoodQuantity,
          as: 'items',
          include: [
            {
              model: db.foods,
              as: 'food'
            }
          ]
        }
      ]
    })

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No order for user' })
    }

    res.status(200).json(orders)
  } catch (error) {
    console.error('Error fetching Orders by user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const createOrderWithItems = async (req, res) => {
  const { deliveryTime, userId, shipperId, items } = req.body

  if (!deliveryTime || !items || items.length === 0) {
    return res.status(400).json({ message: 'Delivery time and items are required.' })
  }

  const t = await db.sequelize.transaction()

  try {
    // Tạo đơn hàng mới
    const newOrder = await Order.create(
      {
        deliveryTime,
        userId,
        shipperId,
        status: 'pending' // Set the initial status to 'pending'
      },
      { transaction: t }
    )

    // Tạo các FoodQuantity mới
    const foodQuantities = items.map((item) => ({
      orderId: newOrder.orderId,
      foodId: item.foodId,
      quantity: item.quantity
    }))

    await FoodQuantity.bulkCreate(foodQuantities, { transaction: t })

    // Commit transaction
    await t.commit()

    // Lấy lại đơn hàng cùng với các món ăn
    const createdOrder = await Order.findOne({
      where: { orderId: newOrder.orderId },
      include: [
        {
          model: FoodQuantity,
          as: 'items',
          include: [
            {
              model: db.foods,
              as: 'food'
            }
          ]
        }
      ]
    })

    res.status(201).json(createdOrder)
  } catch (error) {
    // Rollback transaction nếu có lỗi xảy ra trước khi commit
    if (!t.finished) {
      await t.rollback()
    }
    console.error('Error creating order with items:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateStatusOrder,
  deleteOrder,
  getOrderByShipper,
  getOrderByUser,
  createOrderWithItems
}
