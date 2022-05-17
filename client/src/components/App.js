import React from 'react'


import Header from './header/Header';
import Main from './Main';
import Footer from './Footer'

import { ShoppingCartContextProvider } from '../context/shopping_context'
import { UserContextProvider } from '../context/user_context';

import '../styles/styles.scss'

function App() {



  return (
    <>
      <UserContextProvider>

        <Header />

        <ShoppingCartContextProvider>

          <Main />

        </ShoppingCartContextProvider>

        <Footer />

      </UserContextProvider>


    </>
  );
}

export default App;
