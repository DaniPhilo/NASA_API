import { Draggable } from 'leaflet';
import React, { useState } from 'react'

function Landing({ name, recclass, mass, year, reclat, reclong, id, setLandings, landings }) {

  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3001/api/astronomy/landings/delete/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (data.response) {
      //Se modifica el estado del parent para obligarlo a volver a hacer la llamada a la API. De este modo se cargarán los datos de la DB con el landing ya borrado. No es muy elegante: 
      setLandings(prevState => prevState.filter(landing => landing.id !== id));
    }
  }

  const handleEdit = async (event) => {
    event.preventDefault();

    const editData = {
      name: event.target.name.value || event.target.recclass.placeholder,
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
      body: JSON.stringify(editData)
    });
    const data = await response.json();
    if(data.response) {
      setLandings(prevState => prevState.map(item => item.id === id ? data.landings : item));
      setIsEdit(!isEdit);
    }
  }

  return (
    <div className='landing-card'>
      {!isEdit ?

        <>
          <div className="landing-info">
            <h4>{name}</h4>
            <p>Class: {recclass}</p>
            <p>Mass: {mass}</p>
            <p>Date: {year.slice(0, 10)}</p>
            <p>Lat: {reclat}</p>
            <p>Long: {reclong}</p>
          </div>
          <div className="buttons">
            <button type='button' onClick={() => setIsEdit(() => !isEdit)}>Edit</button>
            <button type='button' onClick={handleDelete}>Delete</button>
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