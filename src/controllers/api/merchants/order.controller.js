import db from '@src/models'
const Order = db.orders
const FoodQuantity = db.foodquantity

const acceptOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    // Tìm đơn hàng theo orderId
    const existingOrder = await Order.findByPk(orderId);
    
    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Kiểm tra trạng thái đơn hàng, chỉ cho phép chấp nhận nếu trạng thái là "pending"
    if (existingOrder.status !== 'pending') {
      return res.status(400).json({ message: 'Only orders with status "pending" can be accepted.' });
    }

    // Cập nhật trạng thái đơn hàng thành "order received"
    existingOrder.status = 'order received';
    const updatedOrder = await existingOrder.save();

    res.status(200).json({ message: 'Order accepted successfully.', updatedOrder });
  } catch (error) {
    console.error('Error accepting order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


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

const calculateOrderTotal = async (req, res) => {
  const orderId = req.params.id

  try {
    // Tìm đơn hàng cùng với các món ăn trong đơn hàng đó
    const order = await Order.findOne({
      where: { orderId: orderId },
      include: [
        {
          model: FoodQuantity,
          as: 'items',
          include: [
            {
              model: db.foods,
              as: 'food',
              attributes: ['price'] 
            }
          ]
        }
      ]
    })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Tính tổng giá trị của đơn hàng
    let totalPrice = 0
    order.items.forEach((item) => {
      totalPrice += item.food.price * item.quantity
    })

    res.status(200).json({ orderId: orderId, totalPrice: totalPrice })
  } catch (error) {
    console.error('Error calculating order total:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const calculateStoreIncome = async (req, res) => {
  const storeId = req.params.id;

  try {
    // Tìm tất cả các đơn hàng có liên quan đến storeId
    const orders = await Order.findAll({
      where: { storeId: storeId }, // Lọc các đơn hàng thuộc về storeId cụ thể
      include: [
        {
          model: FoodQuantity,
          as: 'items',
          include: [
            {
              model: db.foods,
              as: 'food',
              attributes: ['price']
            }
          ]
        }
      ]
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this store.' });
    }

    // Tính tổng thu nhập cho cửa hàng
    let totalIncome = 0;
    orders.forEach(order => {
      order.items.forEach(item => {
        if (item.food) {
          totalIncome += item.food.price * item.quantity;
        }
      });
    });

    res.status(200).json({ storeId: storeId, totalIncome: totalIncome });
  } catch (error) {
    console.error('Error calculating store income:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrdersByStore = async (req, res) => {
  const storeId = req.params.id;

  try {
    const orders = await Order.findAll({
      where: { storeId: storeId }, 
      include: [
        {
          model: FoodQuantity,
          as: 'items',
          include: [
            {
              model: db.foods,
              as: 'food',
              attributes: ['foodName', 'price']
            }
          ]
        }
      ]
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this store.' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error getting orders by store:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  acceptOrder,
  getOrders,
  getOrderById,
  updateStatusOrder,
  calculateOrderTotal,
  calculateStoreIncome,
  getOrdersByStore
}
