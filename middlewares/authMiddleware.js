const JWT = require('jsonwebtoken');

module.exports = async(req,res,next)=>{
    try{
        const token = req.headers["authorization"].split(" ")[1]
        JWT.verify(token,process.env.JWt_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).send({
                    success:false,
                    message:'un-Authorize User'
                })
            }
            else{
                req.body.id = decode.id;
                next();
            }
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'please provide auth token',
            error
    })
    }
}