import {createSlice} from "@reduxjs/toolkit"

export const UserSlicer= createSlice({
    name:"user",
    initialState:{
        token:""
    },
    reducers:{
        setUser:(state,action)=>{
            state.token=action.payload.token;
        },
        logoutUser:(state,action)=>{
            state.token=""
        }
    }
})
export const {setUser,logoutUser}=UserSlicer.actions;
export default  UserSlicer.reducer;