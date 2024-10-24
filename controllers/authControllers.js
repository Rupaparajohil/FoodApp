const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

//REGISTER
const registerController = async(req,res)=>{
    try{
        const {userName, email, password, phone,address,answer} = req.body;
        //validation
        if(!userName || !email || !password || !phone || !address || !answer){
            return res.status(500).send({
                success:false,
                message:'please provide all fields'
            })
        }

        //check user
        const exisiting = await userModel.findOne({email});
        if(exisiting){
            return res.status(500).send({
                success:false,
                message:'email already registerd please login'
            })
        }

        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create new user
        const user = await userModel.create({
            userName,
            email,
            password:hashedPassword,
            address,
            phone,
            answer
        });
        res.status(201).send({
            success:true,
            message:'successfully registered',
            user
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in register API',
            error
        })
    }
};

//LOGIN
const loginController = async (req,res)=>{
    try{
        const {email,password}=req.body;

        //validation
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:'please provide email or password'
            })
        }

        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'user not found'
            });
        }

        //check user password | compare password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:'invalid credentials',
            });
        }

        //Token
        const token = JWT.sign({id:user._id}, process.env.JWT_SECRET,{
            expiresIn:"7d",
        })

        user.password = undefined;
        res.status(200).send({
            success:true,
            message:'login successfully ',
            token,
            user
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in login API',
            error
        })
    }
}

//exports
module.exports = {registerController,loginController};