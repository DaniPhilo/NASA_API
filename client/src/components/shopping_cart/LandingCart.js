import React from 'react'

function LandingCart({ landing, setLandingsCart }) {

  const removeFromCart = () => {
    setLandingsCart(prevState => prevState.filter(item => item.id !== landing.id))
  }

  return (
    <div className='cart-item'>
      <div className='cart-info'>
        <button type='button' onClick={removeFromCart}><i className="fa-solid fa-trash-can"></i></button>
        <h4>{landing.name}</h4>
      </div>

      <div className='price'>
        {(Math.abs(Number(landing.reclat)) * 100).toFixed(2)}€
      </div>
    </div>
  )
}

export default LandingCart