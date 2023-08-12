import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    _id: '',
    image: '',
     
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginRedux : (state,action)=>{
            // console.log( "data using redux :", action)
            state._id = action.payload._id;
            state.first_name = action.payload.first_name;  
            state.last_name = action.payload.last_name;
            state.email = action.payload.email;
            state.image = action.payload.image;
        },
        logoutRedux : (state,action)=>{
            state._id = '';
            state.first_name = '';
            state.last_name = '';
            state.email = '';
            state.image = '';

        }
    },
})
export const { loginRedux,logoutRedux} = userSlice.actions

export default userSlice.reducer