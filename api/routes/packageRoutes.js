const express = require('express')
const router = express.Router()
const {createPackage,getPackagesadmin,deletPackage, getPackages,getSimplifiedPackages,getCount, getPackage,updatePackage,getPackagesCategoryCount, upd} = require('../controllers/PackageController')

// router.get('/updatepa',upd)
router.post('/new', createPackage)
router.get('/',getPackages)
router.get('/admin',getPackagesadmin)
router.delete('/admin/delete/:id', deletPackage )
router.get('/category/count',getPackagesCategoryCount)
router.get('/count', getCount)
router.get('/packagetitles', getSimplifiedPackages)
router.get('/:id',getPackage)
router.patch('/:id',updatePackage)

module.exports = router