import { createSlice } from "@reduxjs/toolkit";
import { insertSession, fetchSession, clearSessions } from "../../db";


export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        logged: false,
        user: null,
        token: undefined,
    },
    reducers: {
        login: (state, action) => {
            if(action.payload.token){
                state.logged = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            }
        },
        logout: (state, action) => {
            if(state.logged === true){
                state.logged = false;
                state.user = null;
                state.token = undefined;
            }
        }
    }
});

export const {login, logout} = sessionSlice.actions

export default sessionSlice.reducer