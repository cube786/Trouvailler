const mongoose = require('mongoose')


const CategoryItem = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{type:String, required:true},
    desktopImg:{
        type:String
    },
    mobileImg: {
        type: String
    }

})


module.exports = mongoose.model('categoryitem', CategoryItem)