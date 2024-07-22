const mongoose=require('mongoose')
 
const UserSchema=mongoose.Schema({
    fullname:{
        type:String
    },
    emailAddress:{
        type:String
    },
    password:{
        type:String
    },
    user_role:{
        type:String,
        enum:['user', 'admin'],
        default:'user'
    },
    created_at:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('user',UserSchema)