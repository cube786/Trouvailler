const mongoose = require('mongoose')


const Location = new mongoose.Schema({
    location:{
        type:String,
        required:true
    },
    description:{type:String, required:true},
    desktopImg:{
        type:String
    },
    mobileImg: {
        type: String
    },
    categories: {
        type: [{
            type:mongoose.Schema.Types.ObjectId,
            ref:'categoryitem'
        }]
    }


})


module.exports = mongoose.model('Location', Location)