import React, { useState } from 'react'

const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserContext,
    UserContextProvider
}