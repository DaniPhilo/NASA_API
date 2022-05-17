import React, { useContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';

import AuthenticationForms from './authentication/AuthenticationForms';
import Image from './Image'
import Map from './landings/Map';
import LandingsList from './landings/LandingsList';
import NeasList from './neas/NeasList';
import ShoppingCart from './shopping_cart/ShoppingCart';

import { UserContext } from '../context/user_context'

function Main() {

    const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);

    const navigate = useNavigate();

    const checkSession = async () => {
        const request = await fetch('https://vast-castle-72865.herokuapp.com/api/auth/session', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include'
        });
        const response = await request.json();
        if (!response.authenticated) {
            setIsAuthenticated(false);
            return navigate('/')
        }
        setIsAuthenticated(true);
    }

    useEffect(() => {
        console.log('Authentication check in Main');
        if (!isAuthenticated) {
            checkSession();
        }
    }, [isAuthenticated]);

    return (
        <main className={isAuthenticated ? 'regular' : 'full'}>
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