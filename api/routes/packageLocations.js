const express = require('express')
const router = express.Router()
const {createPackageLocation,getLocationsBasedOnCategory, getPackageLocations,getPackageLocation ,updateLocation, getAll, deleteLocation} = require('../controllers/PackageLocationsController')


router.post('/', createPackageLocation)
router.get('/',getPackageLocations)
router.get('/all',getAll)
router.get('/category/:category', getLocationsBasedOnCategory)

router.get('/location/:destination',getPackageLocation)
router.delete('/:id',deleteLocation)
router.patch('/:id', updateLocation)


module.exports = router