const mongoose = require('mongoose')


const Admin  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    passwordHash:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        required:true
    },
    isGoogle:{
        type:Boolean
    }

})


module.exports = mongoose.model('AdminModel', Admin)