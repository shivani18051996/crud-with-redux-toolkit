// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser, addUser } from '../redux/slices/userSlice';

function UserForm({ user, setIsEditing }) {
    const dispatch = useDispatch();
    const [formState, setFormState] = useState({ name: '', email: '' });

    useEffect(() => {
        if (user) {
            setFormState(user);
        } else {
            setFormState({ name: '', email: '' });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            dispatch(updateUser(formState));
            setIsEditing && setIsEditing(false);
        } else {
            dispatch(addUser({...formState, id: Date.now()})); // Assuming ID is managed like this for simplicity
        }
        setFormState({ name: '', email: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input 
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <button type="submit">{user ? 'Update User' : 'Add User'}</button>
        </form>
    );
}

export default UserForm;
