const mongoose = require('mongoose')


const PopularPlaces  = new mongoose.Schema({
    place: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Location'
    }
    

})


module.exports = mongoose.model('PopularPlaces', PopularPlaces)