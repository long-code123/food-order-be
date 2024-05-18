const db = require('../models')
const Category = db.categories

const createCategory = async (req, res) => {
  try {
    if (!req.body.categoryName) {
      return res.status(400).json({ message: 'Category name are required.' })
    }
    const newCategory = {
      categoryName: req.body.categoryName,
      categoryImage: req.body.categoryImage
    }
    const createCategory = await Category.create(newCategory)
    res.status(201).json(createCategory)
    console.log('Create Successfully')
  } catch (error) {
    console.error('Error creating category: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
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
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    const existingCategory = await Category.findByPk(categoryId)
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' })
    }
    existingCategory.categoryName = req.body.categoryName || existingCategory.categoryName
    existingCategory.categoryImage = req.body.categoryImage || existingCategory.categoryImage

    const updateCategory = await existingCategory.save()

    res.status(200).json(updateCategory)
  } catch (error) {
    console.error('Error updating category:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    const existingCategory = await Category.findByPk(categoryId)
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' })
    }

    await existingCategory.destroy()

    res.status(200).json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error deleting Category: ', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
}
