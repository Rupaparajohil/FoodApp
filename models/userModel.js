const mongoose = require('mongoose');

//schema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    address:{
        type:Array
    },
    phone:{
        type:String,
        required:[true,'phone number is required']
    },
    usertype:{
        type:String,
        required:[true,'usertype is required'],
        default:'client',
        enum:['client','admin','vendor','driver']
    },
    profile:{
        type:String,
        default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fuser-icon&psig=AOvVaw2p9vxqWFaYtW2gTvuonlmT&ust=1729401847735000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCICB9IjamYkDFQAAAAAdAAAAABAE'

    },
    answer:{
        type:String,
        required:[true,'answer is required']
    }
},{timestamps:true})

//exports
module.exports = mongoose.model('User',userSchema)