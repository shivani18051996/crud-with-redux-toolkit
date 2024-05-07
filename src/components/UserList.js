// src/components/UserList.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../redux/slices/userSlice';
import UserForm from './UserForm';

function UserList() {
    const users = useSelector(state => state.users.users);
    console.log(users,"userList")
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    const handleEdit = (user) => {
        console.log(user,"userEdit")
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
                    <button onClick={handleCancelEdit}>Cancel Edit</button>
                </div>
            ) : (
                <div>
                    <h3>Add New User</h3>
                    <UserForm />
                </div>
            )}
            <ul>
                {users?.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
