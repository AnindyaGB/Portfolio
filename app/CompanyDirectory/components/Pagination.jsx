import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import styles from './Components.module.css'

export default function TablePagination({ setPage, page, totalPages }) {

  const pageButtons = () => {
    const maxVisible = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };


  return (
    <div>
      <Pagination className={styles.pagnation}>
        <PaginationItem disabled={page === 1}>
          <PaginationLink
            first
            onClick={() => setPage(1)}
          />
        </PaginationItem>
        <PaginationItem disabled={page === 1}>
          <PaginationLink
            onClick={() => { page === 1 ? null : setPage((p) => Math.min(totalPages, p - 1)) }}
            previous
          />
        </PaginationItem>
        {page > 3 && (
          <PaginationItem disabled>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        )}
        {pageButtons().map(value => {
          return <PaginationItem key={value} active={value === page}>
            <PaginationLink onClick={() => setPage(value)}>
              {value}
            </PaginationLink>
          </PaginationItem>
        })}
        {page < totalPages - 2 && (
          <PaginationItem disabled>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem disabled={page === totalPages}>
          <PaginationLink
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            next
          />
        </PaginationItem>
        <PaginationItem disabled={page === totalPages}>
          <PaginationLink
            onClick={() => setPage((p) => Math.min(totalPages))}

            last
          />
        </PaginationItem>
      </Pagination>
    </div>
  )
}
