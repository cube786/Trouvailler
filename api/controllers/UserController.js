const mongoose = require("mongoose");
const User = require("../models/User");





const create = async (req, res) => {
    const {phone, email} = req.query;
    if(phone){
        const user = await User.findOne({ phone });
        if(user){
            return res.status(200).json({msg:'exist'})
        }
        else{
            await User.create(req.body)
            return res.status(200).json({msg: "created"})
        }
    }
    if(email){
        const user = await User.findOne({ email });
        if(user){
            return res.status(200).json({msg:'exist'})
        }
        else{
            await User.create(req.body)
            return res.status(200).json({msg: "created"})
        }
    }
}











module.exports = { create };
