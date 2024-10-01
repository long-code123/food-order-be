import db from '@src/models'
const Order = db.orders
const FoodQuantity = db.foodquantity

const createOrder = async (req, res) => {
  try {
    if (!req.body.deliveryTime) {
      return res.status(400).json({ message: 'Order delivery Time is required.' })
    }
    console.log(req.body);
    const newOrder = {
      deliveryTime: req.body.deliveryTime,
      userId: req.body.userId || null,
      shipperId: req.body.shipperId || null,
      storeId: req.body.storeId || null
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
  const { deliveryTime, userId, shipperId, items, storeId } = req.body

  if (!deliveryTime || !items || items.length === 0) {
    return res.status(400).json({ message: 'Delivery time and items are required.' })
  }

  const t = await db.sequelize.transaction()

  try {
    const newOrder = await Order.create(
      {
        deliveryTime,
        userId,
        shipperId,
        status: 'pending',
        storeId
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

const getLastOrderByUser = async (req, res) => {
  const userId = req.params.id; // Lấy userId từ tham số URL

  try {
    // Lấy đơn hàng mới nhất của người dùng
    const lastOrder = await Order.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']], // Sắp xếp theo thời gian tạo, mới nhất trước
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
    });

    if (!lastOrder) {
      return res.status(404).json({ message: 'No order found for user' });
    }

    res.status(200).json(lastOrder);
  } catch (error) {
    console.error('Error fetching last order by user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  getOrderByUser,
  createOrderWithItems,
  createOrder,
  getLastOrderByUser
}
