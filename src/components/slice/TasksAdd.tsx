import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import {v1 as uuidv1} from 'uuid'

interface Task {
    id:string,
    title:string,
    day:string,
    completed:boolean,
    important:boolean,
    catagory:string
};

interface TaskState{
    tasks:Task[];
};

const initialState:TaskState ={
    tasks:[]
};

const taskSlice= createSlice({
    name:'task',
    initialState,
    reducers:{
        addTask:(state , action:PayloadAction<Omit<Task , 'id'>>)=>{
          const newtask:Task={id:uuidv1(),...action.payload}
          state.tasks.push(newtask)
        },
        removeTask:(state , action:PayloadAction<string>)=>{
             state.tasks = state.tasks.filter(task=> task.id!= action.payload);
           
        },
        toggelCompleted:(state , action:PayloadAction<string>)=>{
          const  task = state.tasks.find(task=>task.id === action.payload)
          if(task){
            task.completed=!task.completed
          }
        },
        toggelImportant:(state , action:PayloadAction<string>)=>{
          const  task = state.tasks.find(task=>task.id === action.payload)
          if(task){
            task.important=!task.important
          }
        }

    }
});

export const {addTask , removeTask , toggelCompleted, toggelImportant} = taskSlice.actions;
export default taskSlice.reducer;