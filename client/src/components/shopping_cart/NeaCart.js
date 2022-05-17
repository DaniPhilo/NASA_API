import React from 'react'

function NeaCart({ nea, setNeasCart }) {
  
  const removeFromCart = () => {
    setNeasCart(prevState => prevState.filter(item => item.designation !== nea.designation))
  }

  return (
    <div className='cart-item'>
      <div className='cart-info'>
        <button type='button' onClick={removeFromCart}><i className="fa-solid fa-trash-can"></i></button>
        <h4>{nea.designation}</h4>
      </div>
      <span>
        {(Number(nea.i_deg) * 100).toFixed(2)}€
      </span>
    </div>
  )
}

export default NeaCart