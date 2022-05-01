import React, { useState, useEffect } from 'react'
import Landing from './Landing'

function List() {

  const [landings, setLandings] = useState([]);
  const [created, setCreated] = useState(null);

  useEffect(() => {
    const fetchLandings = async () => {
      const response = await fetch('http://localhost:3001/api/astronomy/landings');
      const data = await response.json();
      if (data.response) {
        setLandings(data.landings);
      }
    }

    fetchLandings();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const landingData = {
      name: event.target.name.value,
      id: event.target.id.value,
      recclass: event.target.recclass.value,
      mass: event.target.mass.value,
      year: event.target.year.value,
      reclat: event.target.reclat.value,
      reclong: event.target.reclong.value,
    }
    const response = await fetch('http://localhost:3001/api/astronomy/landings/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(landingData)
    });
    const data = await response.json();
    if (data.response) {
      setCreated('success');
    }
    else {
      setCreated('failure');
    }
    // event.target.reset();
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" name='name' />

        <label htmlFor="id">Id: </label>
        <input type="text" name='id' />

        <label htmlFor="recclass">Class: </label>
        <input type="text" name='recclass' />

        <label htmlFor="mass">Weight: </label>
        <input type="text" name='mass' />

        <label htmlFor="year">Date: </label>
        <input type="text" name='year' />

        <label htmlFor="reclat">Latitude: </label>
        <input type="text" name='reclat' />

        <label htmlFor="reclong">Longitude: </label>
        <input type="text" name='reclong' />

        <button type='submit'>Create</button>
      </form>

      {created === 'success' && <p>New landing created.</p>}
      {created === 'failure' && <p>Incorrect parameters. Please, try again..</p>}

      <section>
        {landings.length > 0 && landings.map(landing => {
          return <Landing key={landing._id} {...landing} />
        })}
      </section>
    </>

  )
}

export default List