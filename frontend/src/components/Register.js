import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const[userdata, setUserData]=useState({
        fullName:"",
        password:"",
        emailAddress:""
    })
    const [errors,setErrors]=useState({});
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setUserData({...userdata,[e.target.id]:e.target.value})
        setErrors({...errors,[e.target.id]:""})
    }


    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("Inside HandleSubmit");
        const temperror={};
        if(userdata.fullName===""){
            temperror.fullName="Full Name is required"
        }
        else if(userdata.password===""){
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
            axios.post("http://localhost:5000/user/register",{
                "fullName":userdata.fullName,
             
                "password":userdata.password,
                "emailAddress":userdata.emailAddress
            }).then((res)=>{
                alert("Registration Successfull");
                navigate('/login')
            }).catch((err)=>{
                console.log(err.response.data.message)
                setErrors({err_message:err.response.data.message})
            })
        }
    };  
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>

      <label htmlFor='fullName'>Full Name </label><br/>
      <input type="text" id="fullName" onChange={handleChange} value={userdata.fullName}/><br/>
      
      <label htmlFor='emailAddress'>Email Address </label><br/>
      <input type="text" id="emailAddress" onChange={handleChange} value={userdata.emailAddress}/><br/>

      <label htmlFor='password'>Password </label><br/>
      <input type="password" id="password" onChange={handleChange} value={userdata.password}/><br/>
    
      <input type="submit" value="Register"/>
      </form>
    </div>
  )
}

export default Register