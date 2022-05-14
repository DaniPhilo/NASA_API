import React, { useState, useContext } from 'react'

import LandingCart from './LandingCart'
import NeaCart from './NeaCart'
import TotalCart from './TotalCart'

import { ShoppingCartContext } from '../shopping_context'

function ShoppingCart() {

    const { landingsCart, setLandingsCart } = useContext(ShoppingCartContext);
    const { neasCart, setNeasCart } = useContext(ShoppingCartContext);


    return (
        <section>
            <div className="landings-cart">
                <h3>Landings:</h3>
                {landingsCart.map(item => {
                    return (
                        <LandingCart key={item.id} landing={item} setLandingsCart={setLandingsCart} />
                    )
                })}
            </div>
            <div className="neas-cart">
                <h3>NEAs:</h3>
                {neasCart.map(item => {
                    return (
                        <NeaCart key={item.designation} nea={item} setNeasCart={setNeasCart} />
                    )
                })}
            </div>
            <div className="total-cart">
                <TotalCart landingsCart={landingsCart} neasCart={neasCart} />
            </div>
        </section>
    )
}

export default ShoppingCart