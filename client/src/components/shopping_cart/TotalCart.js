import React from 'react'

function TotalCart({ landingsCart, neasCart }) {

  const totalLandings = landingsCart.length ? landingsCart.map(landing => Math.abs(Number(landing.reclat)) * 100).reduce((prev, curr) => prev + curr) : 0;
  const totalNeas = neasCart.length ? neasCart.map(nea => Number(nea.i_deg) * 100).reduce((prev, curr) => prev + curr) : 0;

  return (
    <div className='cart-item'>
      <h3>Total</h3>
      <span>{(totalLandings + totalNeas).toFixed(2)}€</span>
    </div>
  )
}

export default TotalCart