import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../feature/TasksAddSlice.tsx'
import catagoryReducer from '../feature/SidebarNavSlice.js'
 const store = configureStore({
    reducer:{
        toDo:todoReducer,
        catagory:catagoryReducer
    }
 })

 export default store;