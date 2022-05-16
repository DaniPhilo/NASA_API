import React, { useState, useContext } from 'react'

import LandingFront from './LandingFront';

import { ShoppingCartContext } from '../../context/shopping_context'
import { UserContext } from '../../context/user_context';

function Landing({ landing, setLandings }) {

  const { name, recclass, mass, year, reclat, reclong, id } = landing;

  const { setIsAuthenticated } = useContext(UserContext);

  const { landingsCart, setLandingsCart } = useContext(ShoppingCartContext);

  const [isInCart, setIsInCart] = useState(() => {
    const match = landingsCart.filter(item => item.id === id);
    return match.length > 0 ? true : false
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3001/api/astronomy/landings/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'
    });
    if (response.status === 403) {
      return setIsAuthenticated(false);
    }
    const data = await response.json();
    if (data.response) {
      setLandings(prevState => prevState.filter(landing => landing.id !== id));
    }
  }

  const handleEdit = async (event) => {
    event.preventDefault();

    const editData = {
      name: event.target.name.value || event.target.name.placeholder,
      id: id,
      recclass: event.target.recclass.value || event.target.recclass.placeholder,
      mass: event.target.mass.value || event.target.mass.placeholder,
      year: event.target.year.value || event.target.year.placeholder,
      reclat: event.target.reclat.value || event.target.reclat.placeholder,
      reclong: event.target.reclong.value || event.target.reclong.placeholder
    }

    const response = await fetch(`http://localhost:3001/api/astronomy/landings/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(editData)
    });
    if (response.status === 403) {
      return setIsAuthenticated(false);
    }
    const data = await response.json();
    if (data.response) {
      setLandings(prevState => prevState.map(item => item.id === id ? data.landings : item));
      setIsEdit(!isEdit);
    }
  }

  const handleToCart = () => {
    setLandingsCart(prevState => [...prevState, landing]);
    setIsInCart(true);
  }

  const handleDeleteFromCart = () => {
    setLandingsCart(prevState => prevState.filter(item => item.id !== id));
    setIsInCart(false);
  }

  return (
    <div className='card landing-card'>
      {!isEdit ?

        <>

          <div className="card-title">
            <h4>{name}</h4>
          </div>
          <div className="card-content">
            <div className="card-info">
              <p>Class: {recclass}</p>
              <p>Mass: {mass}</p>
              <p>Date: {year.slice(0, 10)}</p>
              <p>Lat: {reclat}</p>
              <p>Long: {reclong}</p>
            </div>
            <div className="card-buttons">
              <button type='button' onClick={() => setIsEdit(() => !isEdit)}><i className="fa-solid fa-pen-to-square"></i></button>
              <button type='button' onClick={handleDelete}><i className="fa-solid fa-trash-can"></i></button>
              {isInCart ?
                <button type='button' onClick={handleDeleteFromCart}><i className="fa-solid fa-cart-shopping"></i></button>
                :
                <button type='button' onClick={handleToCart}><i className="fa-solid fa-cart-shopping"></i></button>
              }
            </div>
          </div>

        </>

        :

        <form action="" onSubmit={handleEdit}>
          <input type="text" name='name' placeholder={name} />
          <input type="text" name='recclass' placeholder={recclass} />
          <input type="text" name='mass' placeholder={mass} />
          <input type="text" name='year' placeholder={year} />
          <input type="text" name='reclat' placeholder={reclat} />
          <input type="text" name='reclong' placeholder={reclong} />
          <button type='submit'>Edit</button>
        </form>
      }

    </div>
  )
}

export default Landing