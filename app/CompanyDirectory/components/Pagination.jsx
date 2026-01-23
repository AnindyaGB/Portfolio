import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import styles from './Components.module.css'

export default function TablePagination({ setPage, page, totalPages }) {

  const pageButtons = () => {
    const array = []
    for (let i = 1; i <= totalPages; i++) {
      array.push(i)
    }
    return array;
  }

  return (
    <div>
      <Pagination className={styles.pagnation}>
        <PaginationItem>
          <PaginationLink
            first
            onClick={() => setPage(1)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => {page === 1? null :  setPage((p) => Math.min(totalPages, p - 1))}}
            previous
          />
        </PaginationItem>
        {pageButtons().map(value => {
          return <PaginationItem key={value} active={value === page}>
            <PaginationLink onClick={() => setPage(value)}>
              {value}
            </PaginationLink>
          </PaginationItem>
        })}

        <PaginationItem>
          <PaginationLink
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            next
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => setPage((p) => Math.min(totalPages))}

            last
          />
        </PaginationItem>
      </Pagination>
    </div>
  )
}
