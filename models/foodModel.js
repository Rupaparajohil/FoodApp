const mongoose = require('mongoose');

//schema
const foodSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'food title is required']
    },
    description:{
        type:String,
        required:[true,'food description is required']
    },
    price:{
        type:Number,
        required:[true,'food price is required']
    },
    imageUrl:{
        type:String,
        default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fcategory-food&psig=AOvVaw01qCWcAiTw4lvQAg0fviEb&ust=1729761068697000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMigq6iUpIkDFQAAAAAdAAAAABAE'
    },
   foodtags:{
        type:String
   },
   category:{
        type:String
   },
   code:{
        type:String
   },
   isAvailabe:{
        type:Boolean,
        default:true
   },
   resturnat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'resturant'
   },
   rating:{
        type:Number,
        defalut:5,
        min:1,
        max:5
   },
   ratingCount:{
        type:String,
   }
},{timestamps:true})

//exports
module.exports = mongoose.model('foods',foodSchema)