import React from 'react'

function LandingsPagination({ currentPage, setCurrentPage, numberOfPages, numberOfDocs }) {

  const previousPage = () => {
    setCurrentPage(prevState => currentPage === 1 ? prevState : prevState - 1);
  }
  const nextPage = () => {
    setCurrentPage(prevState => currentPage === numberOfPages ? prevState : prevState + 1);
  }

  return (
    <div className='pagination-container'>
      {numberOfDocs > 10 &&
        <>
          <button className='previous-page' type='button' onClick={previousPage}><i className="fa-solid fa-chevron-left"></i></button>
          <span>{currentPage} of {numberOfPages}</span>
          <button className='next-page' type='button' onClick={nextPage}><i className="fa-solid fa-chevron-right"></i></button>
        </>
      }
    </div>
  )
}

export default LandingsPagination