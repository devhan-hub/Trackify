import { createSlice } from "@reduxjs/toolkit";

const NavOpen = createSlice({
    name:'nav',
    initialState:{open:true},
    reducers:{
        updateOpen:(state ) => {
            return !state
        }
    }
})

export const {updateOpen} = NavOpen.actions
export const selectOpen = (state => state.open)
export default NavOpen.reducer