import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <nav>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/landings">Landings Map</Link></li>
                <li><Link to="/landings/list">Landings List</Link></li>
                <li><Link to='/neas'>Neas List</Link></li>
                <li><Link to='/cart'>Cart</Link></li>
            </ul>
        </nav>
    )
}

export default Nav