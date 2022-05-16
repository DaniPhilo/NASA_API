import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../context/user_context';

import CreateLanding from './CreateLanding';
import Landing from './Landing'
import LandingsPagination from './LandingsPagination';

function LandingsList() {

  const { setIsAuthenticated } = useContext(UserContext);

  const [landings, setLandings] = useState([]);
  const [order, setOrder] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [numberOfDocs, setNumberOfDocs] = useState(0);

  const [loading, setLoading] = useState(true);

  const fetchLandings = async (url) => {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include',
    });
    if (response.status === 403) {
      setIsAuthenticated(false);
    }
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
        return
      }
    }
    init();
  }, [currentPage]);

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
      <CreateLanding />
      <section className='list-section'>
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

            <div className='cards-container'>
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