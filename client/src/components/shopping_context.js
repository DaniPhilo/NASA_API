import React, { useState } from 'react'

const LandingsCartContext = React.createContext();

const LandingsCartContextProvider = ({ children }) => {

    const [landingsCart, setLandingsCart] = useState([]);

    return (
        <LandingsCartContext.Provider value={{ landingsCart, setLandingsCart }}>
            {children}
        </LandingsCartContext.Provider>
    )
}

const NeasCartContext = React.createContext();

const NeasCartContextProvider = ({ children }) => {
    const [neasCart, setNeasCart] = useState([]);

    return (
        <NeasCartContext.Provider value={{ neasCart, setNeasCart }}>
            {children}
        </NeasCartContext.Provider>
    )
}

export {
    LandingsCartContext,
    LandingsCartContextProvider,
    NeasCartContext,
    NeasCartContextProvider
}