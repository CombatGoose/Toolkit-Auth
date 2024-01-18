import { createAction, createReducer } from '@reduxjs/toolkit';

const { nanoid } = require('nanoid');

const getStoredUsers = () => {
    const storedUsers = localStorage.getItem('usersList');
    return storedUsers ? JSON.parse(storedUsers) : null;
}

const initialState = ({
    list: getStoredUsers() || []
});

export const register = createAction('add/user', (login, firstname, lastname, password) => ({
    payload: { login, firstname, lastname, password }
}));

export const auth = createAction('auth/user', (login, password) => ({
    payload: { login, password }
}));

export const logOut = createAction('logOut/user', (id, password) => ({
    payload: { id, password }
}));

const usersReducer = createReducer(initialState, (builder) => {
    builder.addCase(register, (state, action) => {
        state.list = [
            ...state.list,
            {
                id: nanoid(),
                ...action.payload
            }
        ];
        localStorage.setItem('usersList', JSON.stringify(state.list));
    });
    builder.addCase(auth, (state, action) => {
        const foundUser = state.list.find(user => user.action.login === action.login);
        state.currentUser = foundUser;
        state.list = [
            ...state.list 
        ];
    });
    builder.addCase(logOut, (state, action) => {
        state.list = [
            ...state.list
        ];
    });
});

export default usersReducer;