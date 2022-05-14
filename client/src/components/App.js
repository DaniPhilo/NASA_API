import React from 'react'


import Header from './Header';
import Main from './Main';
import Footer from './Footer'

import { ShoppingCartContextProvider } from './shopping_context'

import '../styles/styles.scss'

function App() {



  return (
    <>
      <Header />
      <ShoppingCartContextProvider>
        <Main />
      </ShoppingCartContextProvider>

      <Footer />
    </>
  );
}

export default App;
