// src/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [
        { id: new Date().getTime(), name: "John Doe", email: "johndoe@example.com" }
    ]
};

console.log(initialState.users)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: {
            reducer: (state, action) => {
                console.log(state,action,"asfsfs")
                return {
                    ...state,
                    users: [...state.users, action.payload]
                };
                // state.users.push(action.payload);
            },
        },
        updateUser: {
            reducer: (state, action) => {
                const { id, name, email } = action.payload;
                const updatedUsers = state.users.map(user =>
                    user.id === id ? { ...user, name, email } : user
                );
                return {
                    ...state,
                    users: updatedUsers
                };
            }
        },
            deleteUser: {
                reducer: (state, action) => {
                    const updatedUsers = state.users.filter(user => user.id !== action.payload);
                    return {
                        ...state,
                        users: updatedUsers
                    };
                }
            },
    }
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
