require('dotenv').config()
const router=require('express').Router()
const bcrypt=require('bcrypt')
const Usermodel=require('../model/User')
const jwt=require('jsonwebtoken')
router.post("/register",async(req,res)=>{
 let fullName=req.body.fullName;
 let emailAddress=req.body.emailAddress;
 let password=req.body.password;

 let hashedPassword=await bcrypt.hash(password,10)

 let temp_obj={
    fullName:fullName,
    emailAddress:emailAddress,
    password:hashedPassword
 }

 try{
    Usermodel.find({emailAddress:emailAddress}).then((result)=>{
        if(result && result.length>0){
            res.status(200).json({
                status:true,
                message:"User already registered"
            })
        }
        else {
            Usermodel.create(temp_obj).then((result)=>{
                res.status(200).json({
                    status:true,
                    message:"user registration successfull"
                })
            })
        }
    })
 } catch(error){
    res.status(500).json({
        status:false,
        message:"Some error occured",
        error:error
    })
 }

})

router.post('/login', (req,res)=>{
    let emailAddress=req.body.emailAddress;
    let password=req.body.password;

    try{
        Usermodel.find({emailAddress:emailAddress}).then(async (result)=>{
            if(result && result.length>0){
                console.log(result)
                let isPasswordMatched=await bcrypt.compare(password,result[0].password)
                if(isPasswordMatched){
                   let token=jwt.sign({
                    _id:result[0]._id,
                    emailAddress:result[0].emailAddress,
                    user_role:result[0].user_role,

                   },process.env.JWT_KEY,{
                    expiresIn:'1d'
                   })
                   res.status(200).json({
                    status:true,
                    message:"logged in",
                    token:token
                   })
                }else{
                    console.log('password not match')
                    res.status(401).json({
                        status:false,
                        message:"incorrect Password",
                    })
                }
            }else{
               
                res.status(401).json({
                    status:false,
                    message:"incorrect email address",
                })
            }
        })
    } catch(error){
        res.status(500).json({
            status:false,
            message:'some error occured',
            error:error
        })
    }
})

router.post("/tokencheck", (req,res)=>{
    let token=req.body.token;
    let decodedvalue=jwt.verify(token,process.env.JWT_KEY)
    try {
        console.log(decodedvalue)
        res.status(200).json({
            status:true,
            data:decodedvalue
        })
    } catch (error) {
        res.status(200).json({
            status:false,
            message:'some error occured',
            error:error
        })
    }
})

module.exports=router