import { Button } from '@radix-ui/themes'
import React from 'react'

function Pagination({ totalPost, postPerPage, setCurrentPage, currentPage }) {
  let pages = []
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i)
  }
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20px'
    }}>
      {currentPage > 1 && <Button variant='outline' onClick={goToPrevPage}>Prev</Button>}
      {pages.map((page, index) => {
        return (
          <Button
            variant={currentPage === page ? 'solid' : 'outline'}
            key={index}
            onClick={() => setCurrentPage(page)}
            mx='2'
            my='2'
          >
            {page}
          </Button>
        )
      })}
      {currentPage < pages.length && <Button variant='outline' onClick={goToNextPage}>Next</Button>}
    </div>
  )
}

export default Pagination