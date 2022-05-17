import React, { useState, useEffect, useContext } from 'react'

import Nav from './Nav';
import BurgerBtn from './BurgerBtn';
import IconNav from './IconNav';

import { UserContext } from '../../context/user_context';

function Header() {

  const { isAuthenticated } = useContext(UserContext);

  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState('first');

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

      {isAuthenticated &&
        <>
          <BurgerBtn setIsVisible={setIsVisible} windowWidth={windowWidth} />
          <IconNav currentPage={currentPage} setCurrentPage={setCurrentPage} windowWidth={windowWidth} />
          <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} isVisible={isVisible} setIsVisible={setIsVisible} />
        </>}
      <h1>NASA<span>.api</span></h1>


    </header>
  )
}

export default Header