// src/components/UserList.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../redux/slices/userSlice';
import UserForm from './UserForm';
import { List, ListItem, ListItemText, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function UserList() {
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    const handleEdit = (user) => {
        setIsEditing(true);
        setCurrentUser(user);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentUser(null);
    };

    return (
        <div>
            <h2>User List</h2>
            {isEditing ? (
                <div>
                    <h3>Edit User</h3>
                    <UserForm user={currentUser} setIsEditing={setIsEditing} />
                    <Button onClick={handleCancelEdit} variant="outlined" color="primary">
                        Cancel Edit
                    </Button>
                </div>
            ) : (
                <div>
                    <h3>Add New User</h3>
                    <UserForm />
                </div>
            )}
            <List>
                {users.map(user => (
                    <ListItem key={user.id} secondaryAction={
                        <>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(user)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    }>
                        <ListItemText primary={`${user.name} - ${user.email}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default UserList;
