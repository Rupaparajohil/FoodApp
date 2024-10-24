const mongoose = require('mongoose');
const colors = require('colors');
require('dotenv').config();


//function mongodb database connection
 const connectDb = async ()=>{
    try{
            await mongoose.connect(process.env.MONGO_URL)
            console.log(`connected to database ${mongoose.connection.host}`.bgWhite);
    }catch(error){
        console.log("DB error",error);
    }
}

// mongoose.connect(process.env.MONGO_URL)
// .then(()=>{console.log("database is connectd")})
//.catch((e)=>{console.log("no connection")});


module.exports = connectDb;