const mongoose = require('mongoose')


const user  = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        
    },
    phone:{
        type:String,
    },
    image:{
        type:String
    },
    authMethod: {
        type:String,
        requred:true
    }
    
    

})


module.exports = mongoose.model('Usermodel', user)