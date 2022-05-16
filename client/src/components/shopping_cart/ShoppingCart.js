import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import LandingCart from './LandingCart'
import NeaCart from './NeaCart'
import TotalCart from './TotalCart'

import { ShoppingCartContext } from '../../context/shopping_context'
import { UserContext } from '../../context/user_context';

function ShoppingCart() {

    const { isAuthenticated } = useContext(UserContext);

    const { landingsCart, setLandingsCart } = useContext(ShoppingCartContext);
    const { neasCart, setNeasCart } = useContext(ShoppingCartContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            return navigate('/');
        }
    }, []);


    return (
        <section className='shopping-section'>
            <div className="landings-cart">
                <h3>Landings:</h3>
                {landingsCart.map(item => {
                    return (
                        <LandingCart key={item.id} landing={item} setLandingsCart={setLandingsCart} />
                    )
                })}
            </div>

            <div className="dividers"></div>

            <div className="neas-cart">
                <h3>NEAs:</h3>
                {neasCart.map(item => {
                    return (
                        <NeaCart key={item.designation} nea={item} setNeasCart={setNeasCart} />
                    )
                })}
            </div>

            <div className="dividers"></div>
            
            <div className="total-cart">
                <TotalCart landingsCart={landingsCart} neasCart={neasCart} />
            </div>
        </section>
    )
}

export default ShoppingCart