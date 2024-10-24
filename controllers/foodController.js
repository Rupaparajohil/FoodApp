const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

//CREATE FOOD
const createFoodController = async (req,res) => {
    try{
        const {title,description,price,imageUrl,foodtags,category,code,isAvailabe,resturnat,rating,ratingCount} = req.body;
        if(!title || !description || !price || !resturnat){
            return res.status(500).send({
                success:false,
                message:'please provide all fields'
            })
        }
        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodtags,
            category,
            code,
            isAvailabe,
            resturnat,
            rating,
            ratingCount
        });
        await newFood.save()
        res.status(201).send({
            success:true,
            message:'new food item created',
            newFood
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in created food api',
            error
        })
    }
}

//GET ALL FOODS
const getAllFoodsController = async (req,res) =>{
    try{
        const foods = await foodModel.find({})
        if(!foods){
            return res.status(404).send({
                success:false,
                message:'no food iteam was found'
            })
        }
        res.status(200).send({
            success:true,
            totalFoods:foods.length,
            foods,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in get all foods API',
            error
        })
    }
}

//GET SINGLE FOOD
const getSingleFoodController = async (req,res) =>{
    try{
        const foodsId = req.params.id;
        if(!foodsId){
            return res.status(404).send({
                success:false,
                message:'please provide id'
            })
        }
        const food = await foodModel.findById(foodsId);
        if(!food){
            return res.status(404),send({
                success:false,
                message:'no food found with htis id'
            })
        }
        res.status(200).send({
            success:true,
            food
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:'false',
            message:'error in get single foods API',
            error
        })
    }
};


//GET FOOD BY RESTURANT
const getFoodByResturantController = async (req,res) =>{
    try{
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:'please provide id'
            })
        }
        const food = await foodModel.find({resturnat:resturantId});
        if(!food){
            return res.status(404),send({
                success:false,
                message:'no food found with htis id'
            })
        }
        res.status(200).send({
            success:true,
            message:"food base on resturant",
            food
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:'false',
            message:'error in get foods by API',
            error
        })
    }
}

//UPDATE FOOD ITEM
const updateFoodController = async (req,res) =>{
    try{
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404),send({
                success:false,
                message:'no food id was found'
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(404).send({
                success:false,
                message:'no food found'
            })
        }
        const {title,
            description,
            price,
            imageUrl,
            foodtags,
            category,
            code,
            isAvailabe,
            resturnat,
            rating}= req.body
        const updatedFood = await foodModel.findByIdAndUpdate(foodId,{title,
            description,
            price,
            imageUrl,
            foodtags,
            category,
            code,
            isAvailabe,
            resturnat,
            rating,
            },{new:true})

        res.status(200).send({
            success:true,
            message:'food item was updated',
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:'false',
            message:'error in update  foods API',
            error
        })
    }
}

//DELETE FOOD CONTROLLER
const deleteFoodController = async (req,res) =>{
    try{
        const foodId = req.params.id
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'provide food id'
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(404).send({
                success:false,
                message:'not food found with id'
            })
        }
        await foodModel.findByIdAndDelete(foodId)
        res.status(200).send({
            success:true,
            message:'food item deleted'
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:'false',
            message:'error in delete food API',
            error
        })

    }
}

//PLACE ORDER
const placeOrderController = async (req,res) =>{
    try{
        const {cart} = req.body
        if(!cart){
            return  res.status(500).send({
                success:false,
                message:'please food cart or payment method'
            })
        }

        let total = 0
        //calculate
        cart.map((i)=>{
            total += i.price
        })

        const newOrder = new orderModel({
            foods:cart,
            payment:total,
            buyer:req.body.id
        })
        await newOrder.save();
        res.status(201).send({
            success:true,
            message:'order placed successfully',
            newOrder
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:'false',
            message:'error in place order API',
            error
        })
    }
}

//CHANGE ORDER STATUS
const orderStatusController = async (req,res) =>{
    try{
        const orderId = req.params.id;
        if(!orderId){
            return res(404).send({
                success:false,
                message:'please provide valid order id'
            })
        }
        const {status}=req.body
        const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})

        res.status(200).send({
            success:true,
            message:"order status updated"
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:'false',
            message:'error in get all foods API',
            error
        })
    }
}

//exports
module.exports = {
    createFoodController,
    getAllFoodsController,
    getSingleFoodController, 
    getFoodByResturantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController
};