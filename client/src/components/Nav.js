import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { UserContext } from '../context/user_context';

function Nav() {

    const { setIsAuthenticated } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogOut = async () => {
        const response = await fetch('http://localhost:3001/api/auth/logOut', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include',
        });
        if (response.status === 200) {
            setIsAuthenticated(false);
            return navigate('/')
        }
        else {
            const data = await response.json();
            console.log(data)
        }
    }

    return (
        <nav>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/landings">Landings Map</Link></li>
                <li><Link to="/landings/list">Landings List</Link></li>
                <li><Link to='/neas'>Neas List</Link></li>
                <li><Link to='/cart'>Cart</Link></li>

                <li onClick={handleLogOut}>Log Out</li>
            </ul>
        </nav>
    )
}

export default Nav