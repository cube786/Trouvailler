const express = require('express')
const router = express.Router()
const {createCategory ,getCategoriesBasedOnCategoryItem,getCategoryadmin,  getCategories, getCategory,deleteCategory, updateCategory, getCategoriesClient} = require('../controllers/CategoryController')


router.post('/', createCategory)

router.get('/categoryitem/:categoryItem', getCategoriesBasedOnCategoryItem)
router.get('/', getCategories)
router.get('/packages', getCategoriesClient)
router.get('/admin/:id' , getCategoryadmin)

router.get('/:id' , getCategory)
router.patch('/:id', updateCategory)
router.delete('/:id',deleteCategory)

module.exports = router