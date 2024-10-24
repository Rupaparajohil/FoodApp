const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

//GET USER INFGO
const getUserController = async(req,res) =>{
    try{
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found'
            })
        }
        //hinde password
        user.password = undefined;
        //resp
        res.status(200).send({
            success:true,
            message:"user get successfully",
            user
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in get user API',
            error
        })
    }
}

//update user info

const updateUserController = async (req,res) => {
    try{
        //find user
        const user = await userModel.findById({_id: req.body.id})
        //validation 
        if(!user){
            return res.status(404).send({
                success:false,
                message:'user not found'
            })
        }
        //update
        const {userName,address,phone} = req.body;
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone

        //save user
        await user.save()
        res.status(200).send({
            success:true,
            message:" user update successfully",
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in update user API',
            error
        })
    }
}

//RESET PASSWORD
const resetPasswordController =async (req,res) => {
    try{
        const {email,newPassword,answer} = req.body;
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:'please provide all fields'
            })
        }
        const user = await userModel.findOne({email,answer})
        if(!user){
            return res.status(500).send({
                success:false,
                message:'user not found or invalid answer'
            })
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);
        user.password = hashedPassword;
        await user.save()
        res.status(200).send({
            success:true,
            message:'password reset successfully'
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in password reset api',
            error
        })
    }
}

//UPDATE USER PASSWORD
const updatePasswordController = async(req,res)=>{
    try{
        //find user
        const user = await userModel.findById({_id:req.body.id});
        //validateion
        if(!user){
            res.status(404).send({
                success:false,
                message:'User not found'
            })
        }

        //get data from user
        const {oldPassword,newPassword} = req.body
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:'please provide old or new password'
            })
        }

        //check user password || compare password
        const isMatch = await bcrypt.compare(oldPassword,user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:'invalid old password'
            })
        }
        
        //hashing password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);
        user.password = hashedPassword;
        await user.save(); 
        res.status(200).send({
            success:true,
            message:'password Updated successfully'
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in password updated API',
            error
        })
    }
}

//DELTER PROFILE ACCOUNT
const deleteProfileController = async (req,res)=>{
    try{
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:'your account has been deleted'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in delete profile API',
            error
        })
    }

}

//exports
module.exports = {getUserController,updateUserController,resetPasswordController,updatePasswordController,deleteProfileController};