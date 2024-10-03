import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messages : [],
    visible : false,
}

export const messageSlice = createSlice({
    name:"message",
    initialState,
    reducers : {
        setMessages : (state, action)=>{
            state.messages = action.payload;
        },
        setVisible : (state, action)=>{
            state.visible = action.payload
        }
    }
})

export const { setMessages, setVisible } = messageSlice.actions
export default messageSlice.reducer
