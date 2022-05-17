import React from 'react'
import { Link } from 'react-router-dom'

import LogOut from './LogOut'

function Nav({ currentPage, setCurrentPage, isVisible, setIsVisible }) {

    

    const handleClick = (event) => {
        setCurrentPage(event.target.innerText);
        setIsVisible(prevState => !prevState);
    }

    return (
        <nav className={isVisible ? 'links-navbar' : 'hidden'}>
            <ul>
                <li className={currentPage === 'Home' ? 'current-page' : 'nav-item'} onClick={handleClick}><Link to="/home">Home</Link></li>
                <li className={currentPage === 'Landings Map' ? 'current-page' : 'nav-item'} onClick={handleClick}><Link to="/landings">Landings Map</Link></li>
                <li className={currentPage === 'Landings List' ? 'current-page' : 'nav-item'} onClick={handleClick}><Link to="/landings/list">Landings List</Link></li>
                <li className={currentPage === 'Neas List' ? 'current-page' : 'nav-item'} onClick={handleClick}><Link to='/neas'>Neas List</Link></li>
                <li className={currentPage === 'Cart' ? 'current-page' : 'nav-item'} onClick={handleClick}><Link to='/cart'>Cart</Link></li>
                <li><LogOut /></li>
            </ul>
        </nav>
    )
}

export default Nav