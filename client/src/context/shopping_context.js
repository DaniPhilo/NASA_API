import React, { useState } from 'react'

const ShoppingCartContext = React.createContext();

const ShoppingCartContextProvider = ({ children }) => {

    const [landingsCart, setLandingsCart] = useState([]);
    const [neasCart, setNeasCart] = useState([]);

    return (
        <ShoppingCartContext.Provider value={{ landingsCart, setLandingsCart, neasCart, setNeasCart }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export {
    ShoppingCartContext,
    ShoppingCartContextProvider
}