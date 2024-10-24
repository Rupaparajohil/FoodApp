const categoryModel = require("../models/categoryModel");

//CREATE CATEGORY
const createCatController = async (req,res) =>{
    try{
        const {title,imageUrl} = req.body;
        //VALIDATION
        if(!title){
            return res.status(500).send({
                success:false,
                message:'please provide category title or image'
            })
        }
        const newCategory = new categoryModel({title,imageUrl})
        await newCategory.save();
        res.status(201).send({
            success:true,
            message:"category created",
            newCategory
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in create category API',
            error
        })
    }
}

//GET ALL CATEGARY
const getAllCatController = async (req,res) =>{
    try{
        const categories = await categoryModel.find({})
        if(!categories){
            return res.status(404).send({
                success:false,
                message:'no categories found'
            })
        }
        res.status(200).send({
            success:true,
            totalCat:categories.length,
            categories
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:true,
            message:'Error in get all category API',
            error
        })
    }
}

//UPDATE CATEGORY
const updateCatController = async (req,res)=>{
    try{
        const {id} = req.params;
        const {title,imageUrl} = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(id,{title,imageUrl}, {new:true});
        if(!updatedCategory){
            return res.status(500).send({
                success:false,
                message:'no category found'
            })
        };
        res.status(200).send({
            success:false,
            message:'category updated successfully'
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in update cat API",
            error
        })
    }
}

//DELETE CATEGORY
const deleteCatController = async (req,res) =>{
    try{
        const {id} = req.params;
        if(!id){
            return res.status(500).send({
                success:false,
                message:'please provide category ID'
            })
        }
        const category = await categoryModel.findById(id)
        if(!category){
            return res.status(500).send({
                success:false,
                message:'no category found with this id'
            })
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'user deleted successfully'
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in deleted API',
            error
        })
    }
}

//EXPORST
module.exports = {createCatController, getAllCatController,updateCatController,deleteCatController};