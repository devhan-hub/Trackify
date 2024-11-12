import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../feature/TasksAddSlice.jsx'
 const store = configureStore({
    reducer:{
        toDo:todoReducer,
    }
 })

 export default store;