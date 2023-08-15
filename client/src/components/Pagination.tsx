import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  handlePageChange: (pageNumber: number) => void;
  forcePage: number;
}

const Pagination = ({
  pageCount,
  handlePageChange,
  forcePage,
}: PaginationProps) => {
  return (
    <ReactPaginate
      className="flex items-center justify-center gap-4 py-0 bg-white select-none"
      activeClassName="bg-primary/50 text-white rounded"
      pageClassName="block h-10 w-10 border cursor-pointer hover:bg-primary/50 hover:text-white rounded transition-all"
      nextLabel="Next"
      previousLabel="Prev"
      previousClassName="h-10 bg-primary text-white rounded w-20"
      previousLinkClassName="w-full h-full flex items-center justify-center hover:text-white/70 transition-all"
      nextClassName="h-10 bg-primary text-white rounded w-20"
      nextLinkClassName="flex items-center justify-center w-full h-full hover:text-white/70 transition-all"
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={(e) => {
        handlePageChange(e.selected + 1);
      }}
      breakLabel="..."
      pageLinkClassName="w-full h-full flex items-center justify-center "
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
