const express = require('express');
const colors  = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
//require('./config/db');

//create object
const app = express();

//dot env configration
dotenv.config();

//DB connection
connectDb();


//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//port
const PORT = process.env.PORT || 8080

//route
//http://localhost:8080
app.use('/api/v1/test',require('./routes/testRoutes'));
app.use('/api/v1/auth',require('./routes/authRoutes'));
app.use('/api/v1/user',require('./routes/userRoutes'));
app.use('/api/v1/resturant',require('./routes/resturantRoutes'));
app.use("/api/v1/category",require('./routes/categoryRoutes'));
app.use("/api/v1/food",require('./routes/foodRoutes'));

app.get('/',(req,res)=>{
    return res.status(200).send("<H1>welcome to food server API base project</H1>");
})

//listen
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`.white.bgRed);
})