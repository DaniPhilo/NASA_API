import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../context/user_context';

function LogOut() {

    const { setIsAuthenticated } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogOut = async () => {
        const response = await fetch('https://vast-castle-72865.herokuapp.com/api/auth/logOut', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include',
        });
        if (response.status === 200 || response.status === 403) {
            setIsAuthenticated(false);
            return navigate('/')
        }
    }

    return (
        <a onClick={handleLogOut}>Log Out</a>
    )
}

export default LogOut