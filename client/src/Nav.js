import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/landing">Map</Link></li>
                <li><Link to="/landing/list">List</Link></li>
            </ul>
        </nav>
    )
}

export default Nav