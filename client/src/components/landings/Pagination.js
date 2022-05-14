import React from 'react'

function Pagination({ landingsInPage, totalLandings, setCurrentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalLandings / landingsInPage); i++) {
        pageNumbers.push(i);
    }

    const changePage = (num) => {
        setCurrentPage(num);
    }
    return (
        <ul className='pagination-list'>
            <li>Page: </li>
            {pageNumbers.map((num, i) => {
                return (
                    <li key={i} className='pagination-item'>
                        <a href="#" className='pagination-link' onClick={() => changePage(num)}>{num}</a>
                    </li>
                )
            })}
        </ul>
    )
}

export default Pagination