import './index.css';
import { useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react';
import SignLogin from './components/Login/SignLogin.jsx';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './Utiles/ProtectedRoute.jsx';
import {selectUserId } from './Redux/User.jsx'
import {fetchUserTask} from './Redux/TasksAddSlice.jsx'
import { reset } from './Redux/TasksAddSlice.jsx';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/NotFound.jsx'
import SideDrawer from './components/sideDrawer/SideDrawer.jsx';
function App() {
const dispatch = useDispatch()
const userId = useSelector(selectUserId)

useEffect(()=> {
  dispatch(reset())
}, [userId , dispatch])

useEffect(()=> {
  dispatch(fetchUserTask({userId}))
}, [userId , dispatch])
  return (
    <div >
      
      <Routes>
      <Route element={<NotFound/>} path ='*'/> 
        <Route path='/login' element={<SignLogin/>}/>
         <Route element={<ProtectedRoute/>} >
            <Route element={<SideDrawer  userId={userId}/>}  path='/'/>
           
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
      />   
      

       </div>
  );
}

export default App;
