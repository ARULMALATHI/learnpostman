import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'

function ProductPage() {
  const[products,setProducts]=useState([])
    useEffect(()=>{
        fetchProducts(); 
    },[])
const fetchProducts= async () =>{
      try {
            let products= await axios.get("http://localhost:5000/product/all")
            console.log(products.data)
            if(products.data.status){
              setProducts(products.data.products)
            }else{
              alert(products.data.message)
            }
      } catch (error) {
        console.log(error)
        alert('something went wrong')
      }
    };
  return (
    <>
    <h1 className='text-danger text-center'>PRODUCTS</h1>
    <div className='container d-flex justify-content-center'>
     {products.length>0 ?
     <div className='row row-cols-1 row-cols-md-2 g-4'>
        <br/>
      {products.map((item)=>(
        <div className='col' >
          <div className='card'>
            {/* <p>{item.product_image}</p> */}
            <Link to={`/product/${item._id}`}> <img src={`http://localhost:5000/${item.product_image}`} className='card-img-top' alt={item.product_name}/></Link>
            <div className='card-body'>
              <h5 className='card-title'>{item.product_name}</h5>
              <p className='card-text'>{item.product_description} </p>
            </div>
          </div>
          </div>
      ))}
    </div>
    :<h1>No products </h1>}
    </div>
    </>
  );
}

export default ProductPage