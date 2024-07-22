require("dotenv").config()
const jwt=require('jsonwebtoken')

const AdminVerifyToken=(req,res,next)=>{
    const token=req.body.token;

    if(!token){
        return res.status(401).json({
            status:false,
            message:"Access Denied.No Token Provided"
        })
    }
    try {
        let decodedvalue=jwt.verify(token,process.env.JWT_KEY)
        if(decodedvalue.user_role=='admin'){
            req.user=decodedvalue
            next()
        }else{
            return res.status(401).json({
                status:false,
                message:"Access Denied. You need to be a admin"
            })
        }
    } catch (error) {
         res.status(400).json({
            message:"Invalide Token"
         });
    }
}

module.exports=AdminVerifyToken