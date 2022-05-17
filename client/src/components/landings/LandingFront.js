import React, { useState, useContext } from 'react'

import { ShoppingCartContext } from '../../context/shopping_context'

function LandingFront({ landing, setLandings, setIsEdit, setIsAuthenticated }) {

    const { name, recclass, mass, year, reclat, reclong, id } = landing;

    const { landingsCart, setLandingsCart } = useContext(ShoppingCartContext);

    const [isInCart, setIsInCart] = useState(() => {
        const match = landingsCart.filter(item => item.id === id);
        return match.length > 0 ? true : false
    });

    const handleDelete = async () => {
        const response = await fetch(`https://vast-castle-72865.herokuapp.com/api/astronomy/landings/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include'
        });
        if (response.status === 403) {
            return setIsAuthenticated(false);
        }
        const data = await response.json();
        if (data.response) {
            setLandings(prevState => prevState.filter(landing => landing.id !== id));
        }
    }

    const handleToCart = () => {
        setLandingsCart(prevState => [...prevState, landing]);
        setIsInCart(true);
    }

    const handleDeleteFromCart = () => {
        setLandingsCart(prevState => prevState.filter(item => item.id !== id));
        setIsInCart(false);
    }

    return (
        <div className='card landing-card'>
            <div className="card-title">
                <h4>{name}</h4>
            </div>
            <div className="card-content">
                <div className="card-info">
                    <p>Class: {recclass}</p>
                    <p>Mass: {mass}</p>
                    <p>Date: {year.slice(0, 10)}</p>
                    <p>Lat: {reclat}</p>
                    <p>Long: {reclong}</p>
                </div>
                <div className="card-buttons">
                    <button type='button' onClick={() => setIsEdit(prevState => !prevState)}><i className="fa-solid fa-pen-to-square"></i></button>
                    <button type='button' onClick={handleDelete}><i className="fa-solid fa-trash-can"></i></button>
                    {isInCart ?
                        <button type='button' onClick={handleDeleteFromCart}><i className="fa-solid fa-cart-shopping"></i></button>
                        :
                        <button type='button' onClick={handleToCart}><i className="fa-solid fa-cart-shopping"></i></button>
                    }
                </div>
            </div>
        </div>
    )
}

export default LandingFront