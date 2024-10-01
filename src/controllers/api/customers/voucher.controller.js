import db from '@src/models'
const Voucher = db.voucher

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
  deleteVoucher
}
