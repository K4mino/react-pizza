import React from 'react';
import styles from './Pagination.module.scss'
import ReactPaginate from 'react-paginate';
import { setActivePage } from "../../reducers/page";
import { useDispatch } from 'react-redux';

const Pagination = () => {
  const dispatch = useDispatch()
  return (
    <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => dispatch(setActivePage(e.selected + 1))}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
  )
}

export default Pagination