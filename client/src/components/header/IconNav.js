import React from 'react'

function IconNav({ currentPage, windowWidth }) {

    return (
        <>
            {windowWidth > 750 &&
                <div className='icons-navbar'>
                    <ul>
                        <li className={currentPage === 'Home' ? 'current-page' : 'icon-nav-item'}><i className="fa-solid fa-house"></i></li>
                        <li className={currentPage === 'Landings Map' ? 'current-page' : 'icon-nav-item'}><i className="fa-solid fa-map-location-dot"></i></li>
                        <li className={currentPage === 'Landings List' ? 'current-page' : 'icon-nav-item'}><i className="fa-solid fa-meteor"></i></li>
                        <li className={currentPage === 'Neas List' ? 'current-page' : 'icon-nav-item'}><i className="fa-solid fa-satellite-dish"></i></li>
                        <li className={currentPage === 'Cart' ? 'current-page' : 'icon-nav-item'}><i className="fa-solid fa-cart-shopping"></i></li>
                        <li><i className="fa-solid fa-right-from-bracket"></i></li>
                        <div className="icon-marker"></div>
                    </ul>
                </div>
            }
        </>
    )
}

export default IconNav