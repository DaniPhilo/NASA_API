import React, { useState, useEffect } from 'react'

import Landing from './Landing'
import LandingsPagination from './LandingsPagination';

function LandingsList() {

  // States to manage pagination:
  const [landings, setLandings] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [created, setCreated] = useState(null);

  useEffect(() => {

    const fetchLandings = async () => {
      const response = await fetch(`http://localhost:3001/api/astronomy/landings/${currentPage}`);
      const data = await response.json();
      if (data.response) {
        setNumberOfPages(Math.floor(data.count / 10));
        setLandings(data.landings);
        setLoading(false);
      }
    }

    fetchLandings();

  }, [currentPage]);


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
    const response = await fetch('/api/astronomy/landings/create', {
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
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit} className='list-form'>

        <h4>Create new landing:</h4>

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

        <input type='submit' value='Create' />
      </form>

      {created === 'success' && <p>New landing created.</p>}
      {created === 'failure' && <p>Incorrect parameters. Please, try again..</p>}

      <section className='landings-section'>
        {loading ?
          <div className="loading">Loading...</div>
          :
          <>
            <div className='landing-container'>
              {landings.length > 0 && landings.map(landing => {
                return (
                  <Landing key={landing._id} landing={landing} setLandings={setLandings} landings={landings} />
                )
              })}
            </div>
            <LandingsPagination currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfPages={numberOfPages} />
          </>

        }
      </section>


    </>
  )
}

export default LandingsList