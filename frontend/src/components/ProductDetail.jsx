// import React, { useEffect,useState } from 'react'
// import { Link } from 'react-router-dom'
// import axios from "axios"
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { useParams } from '@reach/router'

// function ProductDetail() {
//     const{id}=useParams();
//     console.log(id)

//   const[products,setProducts]=useState([])
//     useEffect(()=>{
//         fetchProductById(); 
//     },[])

//     const fetchProductById= async () =>{
      
//             let response= await axios.get(`http://localhost:5000/product/${id}`)
//             console.log(response.data)
//             if(products.data.status){
//               setProducts(response.data.products)
//             }
    
//     };
//   return (
//     <>
//     <h1 className='text-danger text-center'>THE LEAGUE OF SUPERHEROES</h1>
//     <div className='container d-flex justify-content-center'>
//     <img src={`http://localhost:5000/${products.product_image}`} alt={products.product_image} width={120}/>
//     <h2>{products.product_name}</h2>
//     <h2>Price:${products.product_price}.00</h2>
//     <h2>Stock:{products.product_quantity}</h2>
//     </div>
//     </>
//   );
// }

// export default ProductDetail

import axios from 'axios'
import React,{useEffect,useState}from 'react'
import { useParams } from 'react-router-dom'


function ProductDetail() {
  const {id}=useParams();
  console.log(id)
  const [product,setProduct]=useState({})
useEffect(() => {
  fetchProductById()
},[])

    const fetchProductById= async()=>{
      let response=await axios.get(`http://localhost:5000/product/${id}`)
      console.log(response.data)
      console.log(product.product_image)
      if(response.data.status){
        setProduct(response.data.product)
      }
    }
  return (
    <div>
      <h1>Product Detail</h1>
      <div className='container '>
      <img src={`http://localhost:5000/${product.product_image}`} alt={product.product_name} width={120}/>
      
      
      <h2>{product.product_name}</h2>
      <h2>price:${product.product_price}.00</h2>
      <h2>Stock:{product.product_quantity}</h2>
      </div>
    </div>
  )
}

export default ProductDetail