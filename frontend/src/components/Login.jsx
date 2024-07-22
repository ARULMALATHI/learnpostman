import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../reducer/UserReducer';
import { useDispatch } from 'react-redux'; //npm install react-redux @reduxjs/toolkit,  npm install redux-persist

function Login() {
  const[userdata, setUserData]=useState({
    password:"",
    emailAddress:""
})
const [errors,setErrors]=useState({});
const dispatch=useDispatch();
const navigate=useNavigate();

const handleChange=(e)=>{
    setUserData({...userdata,[e.target.id]:e.target.value})
    setErrors({...errors,[e.target.id]:""})
}


const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("Inside HandleSubmit");
    const temperror={};
if(userdata.password===""){
        temperror.password="Password is required"
    }
    else if(userdata.emailAddress===""){
        temperror.emailAddress="Email Address is required"
    }

    console.log(Object.keys(temperror).length)
    if(Object.keys(temperror).length>0){
        setErrors(temperror);
    }
    else{
        setErrors({})
        //api register 
        console.log(userdata);
        axios.post("http://localhost:5000/user/login",{

            "password":userdata.password,
            "emailAddress":userdata.emailAddress
        }).then((res)=>{
            alert("Login Successfull");
            console.log(res.data)
            dispatch(
              setUser({
                token:res.data.token,
                
              })
            );
              navigate("/product")
            
        }).catch((err)=>{
            console.log(err.response.data.message)
            setErrors({err_message:err.response.data.message})
        })
    }
};  
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='emailAddress'>Email Address</label><br/>
        <input type="emailAddress" id="emailAddress"  onChange={handleChange}/><br/>
        <label htmlFor='password'>Password</label><br/>
        <input type='password' id='password' onChange={handleChange}/><br/>
        <input type='submit' value='Login'/>
      </form>
    </div>
  )
}

export default Login