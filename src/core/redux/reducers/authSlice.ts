import { createSlice } from "@reduxjs/toolkit";

type User = {
    auth:{
        username: string,
        avatarUrl: string,
        token: string
    } 
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        username: '',
        avatarUrl: '',
        token: ''
    },
    reducers: {
        setCredentials(state, action) {
            const {username, avatarUrl, token} = action.payload;
            state.username = username;
            state.avatarUrl = avatarUrl;
            state.token = token;
        },
        logOut(state, action){
            state.username = '';
            state.avatarUrl = '';
            state.token = '';
        }
    }
})

export default authSlice.reducer;
export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state: User) => state.auth.username;
export const selectCurrentToken = (state: User) => state.auth.token;