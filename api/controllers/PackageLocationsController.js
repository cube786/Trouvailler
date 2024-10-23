const PackageLocations = require('../models/Locations')
const mongoose = require('mongoose')
const Category = require("../models/CategoryItems");

const getPackageLocations = async (req,res) => {
    try {
        const searchText =  req.query.location;
            console.log("hello")
        const locations = await PackageLocations.find({location: new RegExp(searchText, 'i')}).select('location mobileImg description').exec();
        res.status(200).json(locations)
        console.log(locations)
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });

    }
}

const getLocationsBasedOnCategory = async (req, res) => {
    const {category} = req.params
    try{
        console.log(category, "hello")

        const categoryItem = await Category.findOne({title:category})
        if (!categoryItem) {
            console.log('Category not found');
            return res.status(500).json({ error: 'Server Error' });
        }
        console.log(categoryItem._id)
        const locations = await PackageLocations.find({ categories: categoryItem._id }).exec();
        console.log(locations)
        res.status(200).json(locations)


    }catch(err){
        res.status(500).json({ error: 'Server Error' });

    }
}

const getAll = async (req, res) => {
    try{
        console.log("hello")
        const locations = await PackageLocations.find({})
        return res.status(200).json(locations)

    }
    catch(error){
        console.log(error)
        return res.status(500).json({ error: 'Server Error' });

    }
}

const getPackageLocation = async (req,res) => {
    try {
        const {destination} =  req.params;

        const location = await PackageLocations.findOne({location: destination}).populate({path:'categories', select:'title'});
        res.status(200).json(location)
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });

    }
}

const createPackageLocation = async(req,res) => {
    const {location} = req.body
   try {
    const packageLocation = await PackageLocations.findOne({location :location});
    if(packageLocation){
        console.log('already existing')
        res.status(409).json({message: "Already existing!"})
    }
    else{
       const loc = await PackageLocations.create(req.body)
       res.status(200).json("success")
    }
   } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
   }
}



const updateLocation = async (req,res)=>{
    const {id}=req.params
    console.log(id)
    console.log(req.body)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Pacakge to delete'})
    }
    try{
    const category = await PackageLocations.findOneAndUpdate({_id:id},{
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



const deleteLocation = async (req, res) => {
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such category to delete'})
    }
    try{
    const location = await PackageLocations.findOneAndDelete({_id:id})
    if(!location){
        return res.status(400).json({error:'No such category found'})  
    }
    res.status(200).json(location)
}
catch (error){
    res.status(500).json({ error: 'Server Error' }); 
}
}




module.exports = {createPackageLocation,updateLocation, getPackageLocations, getPackageLocation, getAll, deleteLocation, getLocationsBasedOnCategory}