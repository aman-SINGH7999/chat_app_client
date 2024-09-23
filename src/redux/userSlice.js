import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authUser : null,
    otherUsers : null,  // try [] if its not iterable
    selectedUser : null,
    onlineUsers : null, // try [] if its not iterable
    searchUser : "",
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers : {
        setAuthUser : (state, action)=>{
            state.authUser = action.payload;
        },
        setOtherUsers : (state, action)=>{
            state.otherUsers = action.payload;
        },
        setSelectedUser : (state, action)=>{
            state.selectedUser = action.payload
        },
        setOnlineUsers : (state, action)=>{
            state.onlineUsers = action.payload
        },
        setSearchUser : (state, action)=>{
            state.searchUser = action.payload
        }
    }
})

export const {setAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers, setSearchUser} = userSlice.actions

export default userSlice.reducer