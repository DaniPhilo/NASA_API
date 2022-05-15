import React, { useState, useEffect } from 'react'

import Landing from './Landing'
import LandingsPagination from './LandingsPagination';

function LandingsList() {

  const [landings, setLandings] = useState([]);
  const [order, setOrder] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [numberOfDocs, setNumberOfDocs] = useState(0);

  const [loading, setLoading] = useState(true);
  const [created, setCreated] = useState(null);

  const fetchLandings = async (url) => {
    const response = await fetch(url, {
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include',
  });
    const data = await response.json();
    return data
  }

  useEffect(() => {
    const init = async () => {
      const data = await fetchLandings(`http://localhost:3001/api/astronomy/landings/${currentPage}?field=name&order=1`);
      if (data.response) {
        setNumberOfPages(Math.floor(data.count / 10));
        setNumberOfDocs(data.count);
        setLandings(data.landings);
        setLoading(false);
      }
      setLoading(false);
    }
    init();
  }, [currentPage]);


  const handleCreateForm = async (event) => {
    event.preventDefault();

    const landingData = {
      name: event.target.name.value,
      id: event.target.id.value,
      recclass: event.target.recclass.value,
      mass: event.target.mass.value,
      year: event.target.year.value,
      reclat: event.target.reclat.value,
      reclong: event.target.reclong.value
    }

    const response = await fetch('http://localhost:3001/api/astronomy/landings/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
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

  const handleSearchByName = async (event) => {
    event.preventDefault();

    setLoading(true);
    const data = await fetchLandings(`http://localhost:3001/api/astronomy/landings/name/${event.target.name.value}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include',
    });
    if (data.response) {
      setNumberOfDocs(data.count);
      setLandings(data.landings);
      setLoading(false);
    }
    setLoading(false);
  }

  const changeOrder = async (event) => {
    setLoading(true);
    const data = await fetchLandings(`http://localhost:3001/api/astronomy/landings/1?field=${event.target.id}&order=${order}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include',
    });
    if (data.response) {
      setNumberOfPages(Math.floor(data.count / 10));
      setNumberOfDocs(data.count);
      setLandings(data.landings);
      setOrder(prevState => prevState === 1 ? -1 : 1);
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <>
      <form action="" onSubmit={handleCreateForm} className='list-form'>

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
            <div className="search-by-name">
              <form action="" onSubmit={handleSearchByName}>
                <input type="text" name='name' placeholder='Search by name...' />
                <input type="submit" value='Search' />
              </form>
            </div>
            <div className="order-btns">
              <button type='button' id='name' onClick={changeOrder}>Name</button>
              <button type='button' id='mass' onClick={changeOrder}>Mass</button>
              <button type='button' id='year' onClick={changeOrder}>Date</button>
            </div>

            <div className='landing-container'>
              {landings.length > 0 ? 
              landings.map(landing => {
                return (
                  <Landing key={landing._id} landing={landing} setLandings={setLandings} landings={landings} />
                )
              })
              :
              <p>No results...</p>
              }
            </div>
            <LandingsPagination currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfPages={numberOfPages} numberOfDocs={numberOfDocs} />
          </>

        }
      </section>


    </>
  )
}

export default LandingsList