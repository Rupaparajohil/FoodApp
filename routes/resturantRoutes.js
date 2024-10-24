const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantController, getAllResturantController, getResturandByIdController, deleteResturantController } = require('../controllers/resturantControllers');
const router = express.Router();

//routes
//CREATE RESTURANT || POST
router.post('/create',authMiddleware,createResturantController)

//GET ALL RESTURANT || GET
router.get('/getAll',getAllResturantController)

//GET RESTURANT BY ID || GET
router.get('/get/:id',getResturandByIdController)

//DELete RESTURANT || DELETE
router.delete('/delete/:id',authMiddleware,deleteResturantController)

//exports
module.exports = router