import { createSlice } from "@reduxjs/toolkit";

const initialState={
    type:'taskes'
}
const sideNavigation= createSlice({
    name:'sideType',
    initialState,
    reducers:{
        toggelType:(state , action) =>{
             state.type= action.payload
        }
    }
})

export const {toggelType} = sideNavigation.actions
export default sideNavigation.reducer