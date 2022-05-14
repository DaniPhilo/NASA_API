import React from 'react'

function LandingsPagination( { currentPage, setCurrentPage, numberOfPages }) {

    const previousPage = () => {
        setCurrentPage(prevState => currentPage === 1 ? prevState : prevState - 1);
    }
    const nextPage = () => {
        setCurrentPage(prevState => currentPage === numberOfPages ? prevState : prevState + 1);
    }

  return (
    <div className='pagination-container'>
        <button className='previous-page' type='button' onClick={previousPage}>-</button>
        <span>{currentPage}</span>
        <button className='next-page' type='button' onClick={nextPage}>+</button>
    </div>
  )
}

export default LandingsPagination