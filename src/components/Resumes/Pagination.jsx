import { Button } from '@radix-ui/themes'
import React from 'react'

function Pagination({ totalPost, postPerPage, setCurrentPage }) {
  let pages = []
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i)
  }
  return (
    <div>
      {pages.map((page, index) => {
        return (
          <Button
            key={index}
            onClick={() => setCurrentPage(page)}
            variant='outline'
            mx='2'
            my='2'
          >
            {page}
          </Button>
        )
      })}
    </div>
  )
}

export default Pagination