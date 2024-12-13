import {configureStore} from '@reduxjs/toolkit'
import todoReducer from './TasksAddSlice'
import userReducer from './User';
 const store = configureStore({
    reducer:{
        toDo:todoReducer,
        user:userReducer,
    }
 })

 export default store;