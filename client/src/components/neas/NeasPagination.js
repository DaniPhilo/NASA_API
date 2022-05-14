import React from 'react'

function NeasPagination({ currentPage, setCurrentPage, numberOfPages, numberOfDocs }) {

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
          <button className='previous-page' type='button' onClick={previousPage}>-</button>
          <span>{currentPage} of {numberOfPages}</span>
          <button className='next-page' type='button' onClick={nextPage}>+</button>
        </>
      }
    </div>
  )
}

export default NeasPagination