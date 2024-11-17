import './index.css';
import Main from './components/Main.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react';
import SignLogin from './components/Login/SignLogin.jsx';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './Utiles/ProtectedRoute.jsx';
import {selectUserId ,logoutUser} from './Redux/User.jsx'
import { reset } from './Redux/TasksAddSlice.jsx';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashbored  from './components/Dashbored.jsx'
function App() {
const dispatch = useDispatch()
const userId = useSelector(selectUserId)

useEffect(()=> {
  dispatch(reset())
}, [userId , dispatch])
  return (
    <div >
      <Dashbored/>
      {/* <Routes> */}
        {/* <Route path='/login' element={<SignLogin/>}/>
        <Route element={<ProtectedRoute/>} >
            <Route element={<Main userId = {userId}/>}  path='/home'/>
        </Route>
      </Routes>
      <ToastContainer 
        position="top-center" 
        autoClose={2000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light"
      />    */}
      

       </div>
  );
}

export default App;
