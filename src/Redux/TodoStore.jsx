import {configureStore} from '@reduxjs/toolkit'
import todoReducer from './TasksAddSlice'
import userReducer from './User';
import navReducer from './NavStore'
 const store = configureStore({
    reducer:{
        toDo:todoReducer,
        user:userReducer,
        open:navReducer
    }
 })

 export default store;