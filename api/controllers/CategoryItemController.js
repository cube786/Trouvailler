const mongoose = require("mongoose");
const Category = require("../models/CategoryItems");






const createCategoryItem = async (req,res) => {
    try {
        const category = await Category.create(req.body)
        res.status(200).json(category)

    } catch (error) {
        console.log(error)
    }
}

const getCategorieItems = async (req,res) => {
    const categories = await Category.find({})
    res.status(200).json(categories)
}


const getCategorieItem = async (req,res) => {
    const {title}=req.params

    const category = await Category.find({title})
    res.status(200).json(category)
}



const deleteCategoryItem = async (req, res) => {
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such category to delete'})
    }
    try{
    const category=await Category.findOneAndDelete({_id:id})
    if(!category){
        return res.status(400).json({error:'No such category found'})  
    }
    res.status(200).json(category)
}
catch (error){
    res.status(500).json({ error: 'Server Error' }); 
}
}



const updateCategoryItem = async (req,res)=>{
    const {id}=req.params
    console.log(id)
    console.log(req.body)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Pacakge to delete'})
    }
    try{
    const category = await Category.findOneAndUpdate({_id:id},{
        ...req.body
    })
    
    if(!category){
        return res.status(400).json({error:'No such package found'})  
    }
    res.status(200).json(category)
    }
    catch(error){
        res.status(500).json({ error: "server error" });
    }

}




module.exports = {updateCategoryItem, createCategoryItem,getCategorieItem, getCategorieItems, deleteCategoryItem};
