// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser, addUser } from '../redux/slices/userSlice';
import { TextField, Button, Box } from '@mui/material';

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
            if (setIsEditing) {
                setIsEditing(false);
            }
        } else {
            dispatch(addUser({...formState, id: Date.now()})); // Assuming ID is managed like this for simplicity
        }
        setFormState({ name: '', email: '' });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                value={formState.email}
                onChange={handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                {user ? 'Update User' : 'Add User'}
            </Button>
        </Box>
    );
}

export default UserForm;
