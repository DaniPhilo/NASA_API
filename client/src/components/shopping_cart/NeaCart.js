import React from 'react'

function NeaCart({ nea, setNeasCart, setTotalPrice }) {

  const removeFromCart = () => {
    setNeasCart(prevState => prevState.filter(item => item.designation !== nea.designation))
  }

  return (
    <div>
      <h4>
        <button type='button' onClick={removeFromCart}>Remove</button>
        {nea.designation}
      </h4>
      <span>
        {(Math.random() * (1000 - 400) + 400).toFixed(2)}€
      </span>
    </div>
  )
}

export default NeaCart