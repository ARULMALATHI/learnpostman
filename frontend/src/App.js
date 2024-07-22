import './App.css';
import {Navigate,Routes,Route, useNavigate} from 'react-router-dom'
import ProductPage from './components/ProductPage';
import Productadd from './components/Productadd';
import ProductDetail from './components/ProductDetail';
import Register from './components/Register';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from './reducer/UserReducer';


function App() {
  const user=useSelector(state=>state)
  const dispatch=useDispatch();
  const navigate=useNavigate(); 
  const handleLogout=()=>{
    dispatch(logoutUser())
    navigate("/login")
  }
  return (
   <>
   {user.token && <button onClick={handleLogout}>Log out</button>}
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/product" element={user.token?<ProductPage/>:<Navigate to={"/login"}/>} />
      <Route path="/product/add" element={user.token?<Productadd/>:<Navigate to={"/login"}/>}/>
      <Route path="/product/:id" element={user.token?<ProductDetail/>:<Navigate to={"/login"}/>}/>
    </Routes>
   
   </>
  );
}

export default App;