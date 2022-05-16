import React, { useState, useEffect, useContext } from 'react'

import Nea from './Nea';
import NeasPagination from './NeasPagination';

import { UserContext } from '../../context/user_context';

function NeasList() {

  const { setIsAuthenticated } = useContext(UserContext);

  const [neas, setNeas] = useState([]);
  const [order, setOrder] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [numberOfDocs, setNumberOfDocs] = useState(0);

  const [loading, setLoading] = useState(true);
  const [created, setCreated] = useState(null);

  const fetchNeas = async (url) => {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include',
    });
    if (response.status === 403) {
      return setIsAuthenticated(false);
    }
    const data = await response.json();
    return data
  }

  useEffect(() => {
    const init = async () => {
      const data = await fetchNeas(`http://localhost:3001/api/astronomy/neas/${currentPage}?field=designation&order=1`);
      if (data.response) {
        setNumberOfPages(Math.floor(data.count / 10));
        setNumberOfDocs(data.count);
        setNeas(data.neas);
        setLoading(false);
      }
    }
    init();
  }, [currentPage]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const neaData = {
      designation: event.target.designation.value,
      discovery_date: event.target.discovery_date.value,
      h_mag: event.target.h_mag.value,
      moid_au: event.target.moid_au.value,
      q_au_1: event.target.q_au_1.value,
      q_au_2: event.target.q_au_2.value,
      period_yr: event.target.period_yr.value,
      i_deg: event.target.i_deg.value,
      pha: event.target.pha.value,
      orbit_class: event.target.orbit_class.value
    }
    const response = await fetch('http://localhost:3001/api/astronomy/neas/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(neaData)
    });
    if (response.status === 403) {
      return setIsAuthenticated(false);
    }
    const data = await response.json();
    if (data.response) {
      setCreated('success');
    }
    else {
      setCreated('failure');
    }
    // event.target.reset();
  }

  const handleSearchByDesignation = async (event) => {
    event.preventDefault();

    setLoading(true);
    const data = await fetchNeas(`http://localhost:3001/api/astronomy/neas/designation/${event.target.designation.value}`);
    if (data.response) {
      setNumberOfDocs(data.count);
      setNeas(data.neas);
      setLoading(false);
    }
    setLoading(false);
  }

  const changeOrder = async (event) => {
    setLoading(true);
    const data = await fetchNeas(`http://localhost:3001/api/astronomy/neas/1?field=${event.target.id}&order=${order}`);
    if (data.response) {
      setNumberOfPages(Math.floor(data.count / 10));
      setNumberOfDocs(data.count);
      setNeas(data.neas);
      setOrder(prevState => prevState === 1 ? -1 : 1);
      setLoading(false);
    }
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit} className='list-form'>

        <h4>Create new NEA:</h4>

        <label htmlFor="designation">Designation: </label>
        <input type="text" name='designation' />

        <label htmlFor="discovery_date">Date: </label>
        <input type="text" name='discovery_date' />

        <label htmlFor="h_mag">H_mag: </label>
        <input type="text" name='h_mag' />

        <label htmlFor="moid_au">Moid_au: </label>
        <input type="text" name='moid_au' />

        <label htmlFor="q_au_1">Q_au_1: </label>
        <input type="text" name='q_au_1' />

        <label htmlFor="q_au_2">Q_au_2: </label>
        <input type="text" name='q_au_2' />

        <label htmlFor="period_yr">Period_yr: </label>
        <input type="text" name='period_yr' />

        <label htmlFor="i_deg">I_deg: </label>
        <input type="text" name='i_deg' />

        <label htmlFor="pha">Pha: </label>
        <input type="text" name='pha' />

        <label htmlFor="orbit_class">Orbit_class: </label>
        <input type="text" name='orbit_class' />

        <input type='submit' value='Create' />
      </form>

      {created === 'success' && <p>New NEA created.</p>}
      {created === 'failure' && <p>Incorrect parameters. Please, try again...</p>}

      <section className='list-section'>
        {loading ?
          <div className="loading">Loading...</div>
          :
          <>

            <div className="search-by-name">
              <form action="" onSubmit={handleSearchByDesignation}>
                <input type="text" name='designation' placeholder='Search by designation...' />
                <input type="submit" value='Search' />
              </form>
            </div>

            <div className="order-btns">
              <button type='button' id='designation' onClick={changeOrder}>Name</button>
              <button type='button' id='orbit_class' onClick={changeOrder}>Orbit class</button>
              <button type='button' id='discovery_date' onClick={changeOrder}>Date</button>
            </div>

            <div className='cards-container'>
              {neas.length > 0 ?
                neas.map(nea => {
                  return (
                    <Nea key={nea.designation} nea={nea} setNeas={setNeas} neas={neas} />
                  )
                })
                :
                <p>No results...</p>}
            </div>
            <NeasPagination currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfPages={numberOfPages} numberOfDocs={numberOfDocs} />
          </>
        }
      </section>


    </>
  )
}

export default NeasList