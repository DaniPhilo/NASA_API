import React, { useState, useEffect } from 'react'

import Nav from './Nav';
import BurgerBtn from './BurgerBtn';
import BigNav from './BigNav';

function Header() {

  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {

        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)

        }
    })

    

  return (
    <header>
      <h1>NASA API</h1>
      <BigNav windowWidth={windowWidth} />
      <BurgerBtn setIsVisible={setIsVisible} windowWidth={windowWidth} />
      <Nav isVisible={isVisible} />
    </header>
  )
}

export default Header