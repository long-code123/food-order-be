import db from '@src/models'
const Category = db.categories

const getCategories = async (req, res) => {
  try {
    const allCategories = await Category.findAll()

    res.status(200).json(allCategories)
  } catch (error) {
    console.error('Error getting categories: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const getCategoryById = async (req, res) => {
  const categoryId = req.params.id
  try {
    const category = await Category.findByPk(categoryId)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    res.status(200).json(category)
  } catch (error) {
    console.error('Error getting Category by ID:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}



module.exports = {
  getCategories,
  getCategoryById
}
