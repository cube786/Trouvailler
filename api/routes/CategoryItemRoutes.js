const express = require('express')
const router = express.Router()
const {createCategoryItem, getCategorieItems, deleteCategoryItem, updateCategoryItem, getCategorieItem } = require('../controllers/CategoryItemController')


router.post('/', createCategoryItem)
router.get('/', getCategorieItems)
router.patch('/:id', updateCategoryItem)
router.get('/:title', getCategorieItem)


router.delete('/:id',deleteCategoryItem)

module.exports = router