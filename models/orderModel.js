const mongoose = require('mongoose');

//schema
const orderSchema = new mongoose.Schema({
    foods:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'foods'
    }],
    payments:{},
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        enum:['preparing','prepare','on the way','deliverd'],
        default:'preparing'
    }
},{timestamps:true})

//exports
module.exports = mongoose.model('orders',orderSchema)