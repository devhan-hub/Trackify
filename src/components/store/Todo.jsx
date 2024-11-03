import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../slice/TasksAdd.tsx'
import typeReducer from '../slice/SidebarNavigation.js'
 const store = configureStore({
    reducer:{
        toDo:todoReducer,
        typeCatagory:typeReducer
    }
 })

 export default store;