const multer=require('multer');

var productstorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/products/")
    },
    filename:(req,file,cb)=>{
        //image: image/jpg,image/png
        console.log(file.mimetype)
        let extension=file.mimetype.split('/')[1]
       
        cb(null,`product_image_${Date.now()}.${extension}`)
    }
})

var productUpload=multer({storage:productstorage})
module.exports=productUpload