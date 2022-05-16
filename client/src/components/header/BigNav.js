import React from 'react'

function BigNav({ windowWidth }) {

    return (
        <>
            {windowWidth > 750 &&
                <div className='icons-navbar'>
                    <ul>
                        <li><i className="fa-solid fa-house"></i></li>
                        <li><i className="fa-solid fa-map-location-dot"></i></li>
                        <li><i className="fa-solid fa-meteor"></i></li>
                        <li><i className="fa-solid fa-satellite-dish"></i></li>
                        <li><i className="fa-solid fa-cart-shopping"></i></li>
                        <li><i className="fa-solid fa-right-from-bracket"></i></li>
                    </ul>
                </div>
            }
        </>
    )
}

export default BigNav