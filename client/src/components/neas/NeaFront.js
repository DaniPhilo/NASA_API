import React, {useState, useContext} from 'react'

import { ShoppingCartContext } from '../../context/shopping_context'

function NeaFront({ nea, setNeas, setIsEdit, setIsAuthenticated}) {

    const { designation, discovery_date, h_mag, moid_au, q_au_1, q_au_2, period_yr, i_deg, pha, orbit_class } = nea;

    const { neasCart, setNeasCart } = useContext(ShoppingCartContext);

    const [isInCart, setIsInCart] = useState(() => {
        const match = neasCart.filter(item => item.designation === designation);
        return match.length > 0 ? true : false
    });

    const handleDelete = async () => {
        const response = await fetch(`https://vast-castle-72865.herokuapp.com/api/astronomy/neas/delete/${designation}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include',
        });
        if (response.status === 403) {
            return setIsAuthenticated(false);
        }
        const data = await response.json();
        if (data.response) {
            setNeas(prevState => prevState.filter(nea => nea.designation !== designation));
        }
    }

    const handleToCart = () => {
        setNeasCart(prevState => [...prevState, nea]);
        setIsInCart(true);
    }

    const handleDeleteFromCart = () => {
        setNeasCart(prevState => prevState.filter(item => item.designation !== designation));
        setIsInCart(false);
    }

    return (
        <div className='card nea-card'>
            <div className="card-title">
                <h4>{designation}</h4>
            </div>
            <div className="card-content">
                <div className="card-info">
                    <p>Date: {discovery_date.slice(0, 10)}</p>
                    <p>H_Mag: {h_mag}</p>
                    <p>Moid_au: {moid_au}</p>
                    <p>Q_au_1: {q_au_1}</p>
                    <p>Q_au_2: {q_au_2}</p>
                    <p>Period_yr: {period_yr}</p>
                    <p>I_deg: {i_deg}</p>
                    <p>Pha: {pha}</p>
                    <p>Class: {orbit_class}</p>
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

export default NeaFront