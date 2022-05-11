import React, { useState, useEffect } from 'react'
import Landing from './Landing'
import Pagination from './Pagination';

function List() {

  // States to manage pagination:
  const [landings, setLandings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [landingsInPage, setLandingsInPage] = useState(10);

  const [loading, setLoading] = useState(true);
  const [created, setCreated] = useState(null);
  const [triggerAPICall, setTriggerAPICall] = useState(false);

  const triggerRender = () => {
    setTriggerAPICall(prevState => !prevState);
  }

  useEffect(() => {

    const fetchLandings = async () => {
      const response = await fetch('http://localhost:3001/api/astronomy/landings');
      const data = await response.json();
      if (data.response) {
        setLandings(data.landings);
        setLoading(false);
      }
    }

    fetchLandings();

  }, [triggerAPICall]);


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
    // event.target.reset();
  }

  // Manage pagination:
  const lastLanding = currentPage * landingsInPage;
  const firstLanding = lastLanding - landingsInPage;
  const currentLandings = landings.slice(firstLanding, lastLanding);

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

        <input type='submit' value='Create'/>
      </form>

      {created === 'success' && <p>New landing created.</p>}
      {created === 'failure' && <p>Incorrect parameters. Please, try again..</p>}

      <section className='landings-section'>
        {loading ?
          <div className="loading">Loading...</div>
          :
          <>
            <div className='landing-container'>
              {currentLandings.length > 0 && currentLandings.map(landing => {
                return (
                  <Landing key={landing._id} {...landing} triggerRender={triggerRender} />
                )
              })}
            </div>

            <div className='pagination-section'>
              <Pagination landingsInPage={landingsInPage} totalLandings={landings.length} setCurrentPage={setCurrentPage} />
            </div>
          </>
        }
      </section>


    </>
  )
}

export default List