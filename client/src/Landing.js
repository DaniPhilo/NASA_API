import React from 'react'

function Landing({ name, recclass, mass, year, reclat, reclong }) {

  return (
    <div>
      <h4>{name}</h4>
      <p>{recclass}</p>
      <p>{mass}</p>
      <p>{year}</p>
      <p>{reclat}</p>
      <p>{reclong}</p>

      <div className="buttons">
        <button type='button'>Edit</button>
        <button type='button'>Delete</button>
      </div>
    </div>
  )
}

export default Landing