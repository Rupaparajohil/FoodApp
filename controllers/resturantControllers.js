const resturantModel = require("../models/resturantModel");

//CREATE RESTURANT
const createResturantController = async(req,res) => {
    try{
        const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords}= req.body;

        //validation
        if(!title || !coords){
            return res.status(500).send({
                success:false,
                message:'please provide title and address',
            })
        }

        const newResturant = new resturantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        })
        await newResturant.save();

        res.status(201).send({
            success:true,
            message:'new resturant created successfully'
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in create resturent api',
            error
        })
    }
}

//GET ALL RESTURANT
const getAllResturantController = async (req,res) => {
    try{
        const resturants = await resturantModel.find({})
        if(!resturants){
            res.status(404).send({
                success:false,
                message:'no resturants availible'
            })
        }
        res.status(200).send({
            success:true,
            totalCount:resturantModel.length,
            resturants
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'enter in get all resturant API',
            error
        })
    }
}

//GET RESTURANT BY ID
const getResturandByIdController = async (req,res)=>{
    try{
        const resturantId = req.params.id;
        //VALIDATION
        if(!resturantId){
            res.status(404).send({
                success:false,
                message:'please provide resturant ID'
            })
        }

        //FIND RESTURANT
        const resturant = await resturantModel.findById(resturantId);
        if(!resturant){
            return res.status(404).send({
                success:false,
                message:'no resturant found'
            })
        }
        res.status(200).send({
            success:true,
            resturant
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:true,
            message:'error in get resturant by id api',
            error
        })
    }

}

//DELETE  RESTURANT
const deleteResturantController = async (req,res) =>{
    try{
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:'no resturant found or provide resturant ID'
            })
        }
        await resturantModel.findByIdAndDelete(resturantId);
        res.status(200).send({
            success:true,
            message:'resturant Deleted successfully'
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in delete resturant API',
            error
        })
    }
}


//EXPORT MODULE
module.exports = {createResturantController,getAllResturantController,getResturandByIdController,deleteResturantController};