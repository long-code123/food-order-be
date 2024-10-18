import db from '@src/models'
import { where } from 'sequelize'
const Order = db.orders
const FoodQuantity = db.foodquantity
const Shipper = db.shippers

const getOrdersForShipper = async (req, res) => {

  try {
    const orders = await Order.findAll({
      where: {status: 'received'},
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
    })

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this store.' })
    }

    res.status(200).json(orders)
  } catch (error) {
    console.error('Error getting orders by store:', error)
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
              as: 'food',
              attributes: ['foodName', 'price']
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

const acceptOrderShipper = async (req, res) => {
  const { orderId, shipperId } = req.body;

  // Kiểm tra thông tin yêu cầu
  if (!orderId || !shipperId) {
    return res.status(400).json({ message: 'Order ID and Shipper ID are required.' });
  }

  try {
    // Tìm đơn hàng theo orderId
    const existingOrder = await Order.findByPk(orderId);
    
    // Kiểm tra nếu đơn hàng không tồn tại
    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    // Kiểm tra trạng thái hiện tại của đơn hàng
    if (existingOrder.status !== 'received') {
      return res.status(400).json({ message: 'Order is not in received status.' });
    }

    // Cập nhật trạng thái đơn hàng thành shipping
    existingOrder.status = 'shipping';
    existingOrder.shipperId = shipperId; // Gán shipperId
    const updatedOrder = await existingOrder.save(); // Lưu thay đổi

    res.status(200).json({ message: 'Order status updated to shipping successfully.', updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const orderDone = async (req, res) => {
  const orderId = req.params.id;

  try {
    // Tìm đơn hàng theo orderId
    const existingOrder = await Order.findByPk(orderId);

    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Kiểm tra trạng thái đơn hàng, chỉ cho phép cập nhật nếu trạng thái là "shipping"
    if (existingOrder.status !== 'shipping') {
      return res.status(400).json({ message: 'Only orders with status "shipping" can be marked as done.' });
    }

    // Cập nhật trạng thái đơn hàng thành "done"
    existingOrder.status = 'done';
    const updatedOrder = await existingOrder.save();

    res.status(200).json({ message: 'Order marked as done successfully.', updatedOrder });
  } catch (error) {
    console.error('Error marking order as done:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export default {
  getOrdersForShipper,
  getOrderById,
  getOrderByShipper,
  calculateOrderTotal,
  orderDone,
  acceptOrderShipper
}
