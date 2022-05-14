import React from 'react'

function TotalCart({ landingsCart, neasCart }) {

  const totalLandings = landingsCart.length ? landingsCart.map(landing => Number(landing.price)).reduce((prev, curr) => prev + curr) : 0;
  const totalNeas = neasCart.length ? neasCart.map(nea => Number(nea.price)).reduce((prev, curr) => prev + curr) : 0;

  return (
    <div>
      <h3>Total</h3>
      <span>{(totalLandings + totalNeas).toFixed(2)}€</span>
    </div>
  )
}

export default TotalCart