import { createSlice } from "@reduxjs/toolkit";
import { json } from "stream/consumers";

type SignUpData = {
    userName: string,
    login: string,
    password: string
}
type SignInData = {
    login: string,
    password: string
}
type SignInResponse = {
    name: string,
    avatarUrl: string,
    token: string
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: false,
        username: '',
        avatarUrl: '',
        token: ''
    },
    reducers: {
        signup(state, action) {
            const request = async (url:string = 'http://dev.trainee.dex-it.ru/api/Auth/SignUp', data:SignUpData = action.payload ) => {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(action.payload)
                });
            }
            
        },
        signin(state, action){
            const request = async (url:string = 'http://dev.trainee.dex-it.ru/api/Auth/SignIn', data:SignInData = action.payload ) => {
                const response: SignInResponse = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(action.payload)
                }).then(response => response.json());
                state.isLogged = true;
                state.username = response.name;
                state.avatarUrl = response.avatarUrl;
                state.token = response.token;
            }
        }
    }
})

export default authSlice.reducer;
export const { signup, signin } = authSlice.actions;