require('dotenv').config() 
const express=require('express')
const app=express()
const ProductRouter=require('./route/Product')
const UserRouter=require('./route/User')
const mongoose=require('mongoose')
const mongodbUrl=`mongodb+srv://varshnimalu:${process.env.pass}@malz.7rzzqko.mongodb.net/?retryWrites=true&w=majority&appName=malz`
const path=require('path')
const cors=require('cors')
app.use(cors())
console.log(process.env.pass)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/public',express.static(path.join(__dirname,'uploads'))) 
app.use('/product',ProductRouter)
app.use('/user',UserRouter)

mongoose.connect(mongodbUrl).then(()=>{
    app.listen(5000,(err)=>{
        if(err) throw err
        console.log('Server is running on http://localhost:5000')
        console.log(process.env.pass)
    })
}).catch(err=>{
        console.log(err)
})