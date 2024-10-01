import db from '@src/models'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Store = db.stores
const User = db.users

const getStoreById = async (req, res) => {
  const storeId = req.params.id

  try {
    const store = await Store.findByPk(storeId)

    if (!store) {
      return res.status(404).json({ message: 'Store not found' })
    }

    res.status(200).json(store)
  } catch (error) {
    console.error('Error getting store by ID:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const updateStore = async (req, res) => {
  try {
    const storeId = req.params.id
    const existingStore = await Store.findByPk(storeId)
    if (!existingStore) {
      return res.status(404).json({ message: 'Store not found' })
    }
    existingStore.storeName = req.body.storeName || existingStore.storeName
    existingStore.storeImage = req.body.storeImage || existingStore.storeImage
    existingStore.address = req.body.address || existingStore.address
    const updatedStore = await existingStore.save()
    res.status(200).json(updatedStore)
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error updating store:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const deleteStore = async (req, res) => {
  try {
    const storeId = req.params.id
    const existingStore = await Store.findByPk(storeId)
    if (!existingStore) {
      return res.status(404).json({ message: 'Store not found' })
    }

    // Xóa món ăn khỏi cơ sở dữ liệu
    await existingStore.destroy()

    // Trả về thông báo thành công
    res.status(200).json({ message: 'Store deleted successfully' })
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error('Error deleting store:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const loginUserForStore = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng với email đã cung cấp
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Tạo token JWT
    const token = jwt.sign({ userId: user.userId }, 'secretKey', { expiresIn: '1h' });

    // Tìm cửa hàng liên kết với userId
    const store = await Store.findOne({ where: { userId: user.userId } });

    // Trả về thông tin người dùng và cửa hàng (nếu có)
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        userId: user.userId,
        userName: user.userName,
        email: user.email,
      },
      store: store ? {
        storeId: store.storeId,
        storeName: store.storeName,
        address: store.address,
      } : null
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getStoreById,
  updateStore,
  deleteStore,
  loginUserForStore
}
