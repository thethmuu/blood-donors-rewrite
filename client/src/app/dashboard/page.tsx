"use client";

import React, { useState, useEffect } from "react";

import Loading from "@/conponents/Loading";
import { DataTable } from "@/conponents/dashboard/data-table";
import { columns } from "@/conponents/dashboard/columns";
import Pagination from "@/conponents/dashboard/Pagination";
import TableActions from "@/conponents/TableActions";

import useDonors from "@/hooks/donors/useDonors";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setpageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, refetch, error, isSuccess } = useDonors({
    userId: "1",
    pageNumber: currentPage,
    pageSize,
    search: searchQuery,
  });

  useEffect(() => {
    if (isSuccess) {
      setPageCount(data.pageCount);
    }
  }, [isSuccess, pageCount, currentPage, data]);

  const handlePageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  const handlePageSizeChange = (e: number) => {
    setpageSize(e);
  };

  return (
    <section className="py-10 overflow-y-scroll grow">
      <div className="container space-y-6">
        <TableActions
          handlePageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {!isLoading ? (
          <>
            <DataTable columns={columns} data={data.donors} />
            {pageCount > 0 ? (
              <Pagination
                pageCount={pageCount}
                handlePageChange={handlePageChange}
                forcePage={currentPage - 1}
              />
            ) : null}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
};

export default Dashboard;
