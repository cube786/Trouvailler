const mongoose = require('mongoose')
const Package = require('../models/travelPackages')
const Category = require("../models/Category");


const getCount = async (req, res) => {
    try {
        const totalCount = await Package.countDocuments({})
        const published = await Package.countDocuments({uploaded:true})
        const unPublished = await Package.countDocuments({uploaded:false})

        const family = await Package.countDocuments({categories : "family"})
        const group = await Package.countDocuments({categories : "group"})
        const honeymoon = await Package.countDocuments({categories : "honeymoon"})
        const international = await Package.countDocuments({categories : "international"})


        res.status(200).json({totalCount, published, unPublished, family, group, honeymoon, international})

        
    } catch (error) {
       res.status(500).json({error: "Internal server error"})
    }
}


const getPackagesCategoryCount = async (req, res) => {
    try {
        console.log(req.query)
        const {  location } = req.query;
        
        // Build the query object based on parameters
        const query = {};
        
        query.uploaded = true;
       
        if (location) {
            query.locations = location;
        }
        
        
       

        // Use async/await with try-catch for better error handling




       
            const categoryCounts = await Package.aggregate([
                { $match: query },
                { $unwind: "$categories" },
                { $group: { _id: "$categories", count: { $sum: 1 } } },
                { $project: { _id: 0, category: "$_id", count: 1 } }
            ]);

            res.status(200).json(categoryCounts );
        


    } catch (error) {
        // Handle any errors that occur during the execution
        console.error('Error in getPackages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




const getPackages = async (req, res) => {


    try {
        console.log(req.query)
        const { uploaded, location, category, minprice, maxprice } = req.query;
        
        // Build the query object based on parameters
        const query = {};
        
        
            query.uploaded = true;
        
        if (category ) {
            query.categories = category;
        }
        if (location) {
            query.$or = [
              { locations: location },        // Condition 1: match packages where 'locations' array contains the location
              { secondaryLocations: location } // Condition 2: match packages where 'secondaryLocations' array contains the location
            ];
          }
        
        
        if (minprice && maxprice) {
            query.price = { $gte: parseInt(minprice), $lte: parseInt(maxprice) };
        }

        console.log(query);
        

        // Use async/await with try-catch for better error handling
        const packages = await Package.find(query);
        packages.reverse()

        const sortedPackages = packages.sort((a, b) => {
            const aPrimary = a.locations.includes(location);
            const bPrimary = b.locations.includes(location);
      
            // Prioritize based on whether the location is in 'locations' (primary) or 'secondaryLocations'
            if (aPrimary && !bPrimary) {
              return -1; // a has primary location, move it before b
            }
            if (!aPrimary && bPrimary) {
              return 1; // b has primary location, move it before a
            }
            return 0; // Both are equal in terms of primary/secondary, so maintain current order
          });


      
            

            res.status(200).json({packages: sortedPackages, totalCount: sortedPackages.length });
        


    } catch (error) {
        // Handle any errors that occur during the execution
        console.error('Error in getPackages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPackagesadmin = async (req, res) => {


    try {
        console.log(req.query)
        const { uploaded, location, category, minprice, maxprice, page, pagesize } = req.query;
        
        // Build the query object based on parameters
        const query = {};
        
        if(uploaded){
            query.uploaded = uploaded;
        }
        if (category ) {
            query.categories = category;
        }
        if (location) {
            query.locations = location;
        }
        
        
        if (minprice && maxprice) {
            query.price = { $gte: parseInt(minprice), $lte: parseInt(maxprice) };
        }

        console.log(query);
        

        // Use async/await with try-catch for better error handling
        const packages = await Package.find(query);



        packages.reverse()

        if(page && pagesize){
            const pageNum = parseInt(page);
            const pageSizeNum = parseInt(pagesize);
            const start = (pageNum - 1) * pageSizeNum;
            const end = pageNum * pageSizeNum;
            const paginatedPackages = packages.slice(start, end)
            const totalPages = Math.ceil(packages.length / pageSizeNum);
            res.status(200).json({packages: paginatedPackages, totalPages, totalCount: packages.length});


        }
       


    } catch (error) {
        // Handle any errors that occur during the execution
        console.error('Error in getPackages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Assuming you have a global error handler middleware for uncaught errors.
// If not, you might want to consider adding one to handle unexpected errors.


const getSimplifiedPackages = async (req,res) => {
    const packages = await Package.find({}).select('_id title titleImage').lean()
    res.status(200).json(packages)
    console.log(packages)

}




const getPackage = async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such package exists'})
    }
    const pack=await Package.findById(id)
    if(!pack){
        return res.status(404).json({error:'No such package found'})
    }

  res.status(200).json(pack)
}

const createPackage = async (req, res) => {
    
    try {
        const package = await Package.create(req.body)
        res.status(200).json(package)

    } catch (error) {
        console.log(error)
    }
}

const updatePackage = async (req,res)=>{
    console.log("hello there")
    const {id}=req.params
    console.log(req.body)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Pacakge to delete'})
    }
    try{
    const pack = await Package.findOneAndUpdate({_id:id},{
        ...req.body
    })
    
    if(!pack){
        return res.status(400).json({error:'No such package found'})  
    }
    res.status(200).json(pack)
    }
    catch(error){
        res.status(500).json({ error: "server error" });
    }

}

const deletPackage = async (req, res) => {
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        
        return res.status(404).json({error:'No such Package to delete'})
    }
    try{
        console.log(id)
        const categories = await Category.find({ packages: id });
        console.log(categories)
        for (const category of categories) {
            category.packages = category.packages.filter(pkg => pkg.toString() !== id);
            await category.save();
          }
        
        await Package.findByIdAndDelete(id);

        res.status(200).json({msg:"Deleted successfully"})
}
catch (error){
    res.status(500).json({ error: 'Server Error' }); 
}
}




const upd = async (req, res) => {
    try {
        console.log("hello")
        const pack= await Package.updateMany({ }, { $set: { secondaryLocations: [] } });
        res.status(200).json(pack)
        
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

module.exports = {createPackage,getPackages,deletPackage, getCount,getPackagesadmin, getPackage,getSimplifiedPackages, updatePackage, upd, getPackagesCategoryCount}