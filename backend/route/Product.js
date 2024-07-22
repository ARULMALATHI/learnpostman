const router=require('express').Router()
const productupload=require('../middleware/fileUpload')
const productModel=require('../model/Product')
const AdminVerifyToken=require('../middleware/userVerify')

router.get('/',(req,res)=>{
    res.status(200).json({
        status:true,
        message:'Welcome'
    })
    
})

router.post("/create",productupload.single("product_image"),AdminVerifyToken,(req,res)=>{
  
    console.log(req.file)
    try{
        var temp_product={
            product_name:req.body.product_name,
            product_price:req.body.product_price,
            product_quantity:req.body.product_quantity,
            product_description:req.body.product_description,
            product_image:"public/products/"+req.file.filename
         }
         productModel.create(temp_product).then((result)=>{
            res.status(200).json({
                status:true,
                message:'Product created successfully',
                data:req.user
            })
         }).catch((err)=>{
            console.log(err)
            res.status(500).json({
                status:false,
                message:'some error',
                error:err
            })
         });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:false,
            message:'Error',
            error:error
        })
    }
})

router.get("/all",async(req,res)=>{
    try {
        let products=await productModel.find({})
        if(products.length>0){
            res.status(200).json({
                status:true,
                products:products
            })

        }else{
            res.status(404).json({
                status:false,
                message:"No Products available"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:false,
            message:'something went wrong',
            error:error
        })
    }
})

router.get('/:id',async(req,res)=>{
  try {
    let id=req.params.id;
    let product=await productModel.findById(id)
    console.log(product)
    if(product){
        res.status(200).json({
            status:true,
            product:product
        })
    }else{
        res.status(404).json({
            status:false,
            message:'product not found'
        })
    }
  } catch (error) {
     console.log(error)
     res.status(500).json({
        status:false,
        message:'something went wrong',
        error:error
     })
  }
})
module.exports=router