const mongoose = require('mongoose');

//schema
const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"category title is required"]
    },
    imageUrl:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fcategory-food&psig=AOvVaw01qCWcAiTw4lvQAg0fviEb&ust=1729761068697000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMigq6iUpIkDFQAAAAAdAAAAABAE"
    }
},{timestamps:true})

//exports
module.exports = mongoose.model('category',categorySchema)