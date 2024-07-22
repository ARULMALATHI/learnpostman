import React, { useState } from 'react'
import axios from 'axios'
import './productadd.css'
 function Productadd() {
    const [product,setProduct]=useState({
        product_name:'',
        product_price:'',
        product_quantity:'',
        product_description:'',
        product_image:null
    })

    const handleChange=(e)=>{
        if(e.target.id!=='product_image'){
            setProduct({...product,[e.target.id]:e.target.value})
        }else{
            setProduct({...product,[e.target.id]:e.target.files[0]})
        }
}

const handleSubmit=(e)=>{
    e.preventDefault()
    const formdata=new FormData();
    formdata.append('product_name',product.product_name)
    formdata.append('product_price',product.product_price)
    formdata.append('product_quantity',product.product_quantity)
    formdata.append('product_description', product.product_description)
    formdata.append('product_image',product.product_image)
    axios.post('http://localhost:5000/product/create',formdata,{
        headers:{
            "Content-Type":"multipart/form-data",

        }
    }).then((res)=>{
        alert("Successfully added product")
    }).catch((err)=>{
        console.log(err)
    })
}
  return (
    <div className='formdiv'>
        <h1 className='text-danger text-center bg-primary'>PRODUCT ADD</h1>
        <form onSubmit={handleSubmit} className='forminput'>
            <label for="product_name" >Product Name:</label>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' id='product_name' onChange={handleChange} placeholder='Enter Product Name'/>
            <br/> <br/>
            <label for="product_price">Product Price:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' id='product_price' onChange={handleChange}/>
            <br/> <br/>
            <label for="product_quantity">Product Quantity:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' id='product_quantity' onChange={handleChange}/>
            <br/> <br/>
            <label for="product_description">Product Description:</label>
            &nbsp;<input type='text' id='product_description' onChange={handleChange}/>
            <br/>  <br/>
            <label for="product_image">Product Image:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type='file' id='product_image' onChange={handleChange}/>
            <br/> <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type='submit' value="submit" className='bg-primary border-0 w-50' />
            <br/> <br/>
        </form>
    </div>
  )
}
export default Productadd
