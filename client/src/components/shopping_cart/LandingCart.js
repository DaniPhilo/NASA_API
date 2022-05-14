import React, { useEffect } from 'react'

function LandingCart({ landing, setLandingsCart, setTotalPrice }) {

  const removeFromCart = () => {
    setLandingsCart(prevState => prevState.filter(item => item.id !== landing.id))
  }

  return (
    <div>
      <h4>
        <button type='button' onClick={removeFromCart}>Remove</button>
        {landing.name}
      </h4>
      <span>
        {landing.price}€
      </span>
    </div>
  )
}

export default LandingCart