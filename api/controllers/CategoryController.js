const mongoose = require("mongoose");
const Category = require("../models/Category");



const getCategories = async (req,res) => {
    const categories = await Category.find({})
    res.status(200).json(categories)
}
const getCategoriesBasedOnCategoryItem = async (req,res) => {
    const {categoryItem} = req.params
    console.log(categoryItem)
    const categories = await Category.find({page:categoryItem,uploaded:true}).populate({path:'packages',match:{uploaded:true}, select:'title titleImage shortDuration shortDescription price cardTags location'})
    console.log(categories)

    res.status(200).json(categories)
}


const getCategoriesClient = async (req,res) => {
    const categories = await Category.find({uploaded:true, page:"null"}).populate({path:'packages',match:{uploaded:true}, select:'title titleImage shortDuration shortDescription price cardTags location'})
    console.log(categories)
    res.status(200).json(categories.filter(itm => itm._id !== "65999e37781eacb0f9723bcc"))
}

const getCategory = async (req, res) => {
    const {id} = req.params

    const category = await Category.findById(id).populate({path:'packages',match:{uploaded:true},select:'title titleImage shortDuration shortDescription price cardTags location'})
    res.status(200).json(category)
}

const getCategoryadmin = async (req, res) => {
    const {id} = req.params

    const category = await Category.findById(id).populate({path:'packages',select:'title titleImage shortDuration shortDescription price cardTags location'})
    res.status(200).json(category)
}


const createCategory = async (req,res) => {
    try {
        const category = await Category.create(req.body)
        res.status(200).json(category)

    } catch (error) {
        console.log(error)
    }
}

const deleteCategory = async (req, res) => {
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such hotel to delete'})
    }
    try{
    const category=await Category.findOneAndDelete({_id:id})
    if(!category){
        return res.status(400).json({error:'No such hotel found'})  
    }
    res.status(200).json(category)
}
catch (error){
    res.status(500).json({ error: 'Server Error' }); 
}
}





const updateCategory = async (req,res)=>{
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





module.exports = { getCategories,createCategory ,getCategoryadmin,deleteCategory, getCategory ,updateCategory, getCategoriesClient, getCategoriesBasedOnCategoryItem};
