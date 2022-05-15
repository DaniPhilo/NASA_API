import React from 'react'
import { Routes, Route } from 'react-router-dom';

import AuthenticationForms from './authentication/AuthenticationForms';
import Image from './Image'
import Map from './landings/Map';
import LandingsList from './landings/LandingsList';
import NeasList from './neas/NeasList';
import ShoppingCart from './shopping_cart/ShoppingCart';

function Main() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<AuthenticationForms />} />
                <Route path="/home" element={<Image />} />
                <Route path="/landings" element={<Map />} />
                <Route path="/landings/list" element={<LandingsList />} />
                <Route path="/neas" element={<NeasList />} />
                <Route path="/cart" element={<ShoppingCart />} />
            </Routes>
        </main>
    )
}

export default Main