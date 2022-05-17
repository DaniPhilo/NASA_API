import React, { useState, useEffect, useContext } from 'react'

import Nea from './Nea';
import NeasPagination from './NeasPagination';
import CreateNea from './CreateNea';

import { UserContext } from '../../context/user_context';

function NeasList() {

  const { setIsAuthenticated } = useContext(UserContext);

  const [neas, setNeas] = useState([]);
  const [order, setOrder] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [numberOfDocs, setNumberOfDocs] = useState(0);

  const [loading, setLoading] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);

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
      const data = await fetchNeas(`https://vast-castle-72865.herokuapp.com/api/astronomy/neas/${currentPage}?field=designation&order=1`);
      if (data.response) {
        setNumberOfPages(Math.floor(data.count / 10));
        setNumberOfDocs(data.count);
        setNeas(data.neas);
        setLoading(false);
      }
    }
    init();
  }, [currentPage]);

  const handleSearchByDesignation = async (event) => {
    event.preventDefault();

    setLoading(true);
    const data = await fetchNeas(`https://vast-castle-72865.herokuapp.com/api/astronomy/neas/designation/${event.target.designation.value}`);
    if (data.response) {
      setNumberOfDocs(data.count);
      setNeas(data.neas);
      setLoading(false);
    }
    setLoading(false);
  }

  const changeOrder = async (event) => {
    setLoading(true);
    setIsFirstRender(false);
    const data = await fetchNeas(`https://vast-castle-72865.herokuapp.com/api/astronomy/neas/1?field=${event.target.id}&order=${order}`);
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
      <CreateNea />

      <section className='list-section'>
        {loading ?
          <div className="loading"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
          :
          <>

            <div className="search-by-name">
              <form action="" onSubmit={handleSearchByDesignation}>
                <input type="text" name='designation' placeholder='Search by designation...' />
                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
              </form>
            </div>

            <div className="order-buttons">
              {!isFirstRender ? (order === -1 ? <i className="fa-solid fa-arrow-down-long"></i> : <i className="fa-solid fa-arrow-up-long"></i>) : ''}
              <button type='button' id='designation' onClick={changeOrder}>Name</button>
              <button type='button' id='orbit_class' onClick={changeOrder}>Orbit Class</button>
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
                <p className='no-results'>No results...</p>}
            </div>
            <NeasPagination currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfPages={numberOfPages} numberOfDocs={numberOfDocs} />
          </>
        }
      </section>


    </>
  )
}

export default NeasList