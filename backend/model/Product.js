const mongoose=require('mongoose')

const ProductSchema=mongoose.Schema({
    product_name:{
        type:String
    },
    product_price:{
        type:Number
    },
    product_quantity:{
        type:Number
    },
    product_description:{
        type:String
    },
    product_image:{
        type:String
    }
})

//model('collection name',schema)
module.exports=mongoose.model('Product',ProductSchema)