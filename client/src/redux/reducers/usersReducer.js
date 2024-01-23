import { createAction, createReducer } from '@reduxjs/toolkit';

const { nanoid } = require('nanoid');

const getStoredUsers = () => {
    const storedUsers = localStorage.getItem('usersList');
    return storedUsers ? JSON.parse(storedUsers) : null;
}

const initialState = ({
    list: getStoredUsers() || [],
    posts: []
});

export const register = createAction('add/user', (login, firstname, lastname, password, posts) => ({
    payload: { login, firstname, lastname, password }
}));

export const auth = createAction('auth/user', (login, password) => ({
    payload: { login, password }
}));

export const logOut = createAction('logOut/user', (id, password) => ({
    payload: { id, password }
}));

export const createPost = createAction('create/post', (userId, postName, postMessage) => ({
    payload: { userId, postName, postMessage }
}));

export const deletePost = createAction('delete/post', (candidateId) => ({
    payload: { candidateId }
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
        state.list = [
            ...state.list 
        ];
    });
    builder.addCase(logOut, (state, action) => {
        state.list = [
            ...state.list
        ];
    });
    builder.addCase(createPost, (state, action) => {
        state.posts = [
            ...state.posts,
            {
                userId: action.payload.userId,
                postId: nanoid(),
                postName: action.payload.postName,
                postMessage: action.payload.postMessage
            }
        ];
        localStorage.setItem('posts', JSON.stringify(state.posts));
    });
    builder.addCase(deletePost, (state, action) => {
        state.posts = [
            ...state.posts.filter(candidateId => candidateId !== action.payload.candidateId)
        ];
    });
});

export default usersReducer;