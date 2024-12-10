import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        logged: false,
        user: null,
        token: undefined
    },
    reducers: {
        login: (state, action) => {
            if(action.payload.token){
                state.logged = true;
                state.user = action.payload.user;
                state.token = action.payload.token
            }
        },
        logout: (state, action) => {
            if(state.logged === false){
                state.logged = false;
                state.user = null;
                state.token = undefined;
                return 'Ha cerrado sessión con éxito'
            }
        }
    }
});

export const {login, logout} = sessionSlice.actions

export default sessionSlice.reducer