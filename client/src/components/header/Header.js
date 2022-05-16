import React, { useState } from 'react'

import Nav from './Nav';
import BurgerBtn from './BurgerBtn';

function Header() {

  const [isVisible, setIsVisible] = useState(false);

  return (
    <header>
      <h1>NASA API</h1>
      <BurgerBtn setIsVisible={setIsVisible} />
      <Nav isVisible={isVisible} />
    </header>
  )
}

export default Header