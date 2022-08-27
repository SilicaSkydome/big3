import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "Authentication",
    initialState: {
        isLogged: false,
        username: null,
        login: null,
        password: null,
    },
    reducers: {

    }
})

export default authSlice.reducer;
export const {} = authSlice.actions;