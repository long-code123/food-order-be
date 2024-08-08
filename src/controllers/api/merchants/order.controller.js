import db from '@src/models'
const Order = db.orders
const FoodQuantity = db.foodquantity

const acceptOrder = async (req, res) => {
  // TODO: Xử lý chấp nhận đơn hàng
}

const getOrdersByMerchantId = async (req, res) => {
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

export default {
  getOrderById,
  updateStatusOrder,
  deleteOrder
}
