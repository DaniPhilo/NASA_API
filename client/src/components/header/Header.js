import React, { useState, useEffect, useContext } from 'react'

import Nav from './Nav';
import BurgerBtn from './BurgerBtn';
import BigNav from './BigNav';

import { UserContext } from '../../context/user_context';

function Header() {

  const { isAuthenticated } = useContext(UserContext);

  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return _ => {
      window.removeEventListener('resize', handleResize);
    }
  });

  return (
    <header>
      <h1>NASA API</h1>
      {isAuthenticated &&
        <>
          <BurgerBtn setIsVisible={setIsVisible} windowWidth={windowWidth} />
          <BigNav windowWidth={windowWidth} />
          <Nav isVisible={isVisible} setIsVisible={setIsVisible} />
        </>}

    </header>
  )
}

export default Header