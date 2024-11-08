import { createSlice } from "@reduxjs/toolkit";

const initialState={
    defaultCatgory:['myday' , 'important','planned','taskes'],
    addedCatagory:[],
    type:'taskes'
}
const sideNavigation= createSlice({
    name:'sideType',
    initialState,
    reducers:{
        addCatagory:(state , action)=>{
            state.addedCatagory.push(action.payload)
        },
        toggelType:(state , action) =>{
             state.type= action.payload
        }
    }
})

export const selectDefaultCatagory=(state)=>state.catagory.defaultCatgory
export const selectAddedCatagory=(state)=>state.catagory.addedCatagory
export const selectCurrentCatgory=(state)=>state.catagory.type

export const {toggelType , addCatagory} = sideNavigation.actions
export default sideNavigation.reducer