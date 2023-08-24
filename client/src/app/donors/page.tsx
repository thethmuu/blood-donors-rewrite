"use client";

import React, { useState, useEffect } from "react";

import Loading from "@/components/Loading";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/donors/columns";
import Pagination from "@/components/Pagination";
import TableActions from "@/components/TableActions";

import useDonors from "@/hooks/donors/useDonors";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setpageSize] = useState(10);
  const [bloodType, setBloodType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, refetch, error, isSuccess } = useDonors({
    pageNumber: currentPage,
    pageSize,
    search: searchQuery,
    bloodType,
  });

  useEffect(() => {
    if (isSuccess) {
      setPageCount(data.pageCount);
    }
  }, [isSuccess, pageCount, currentPage, data]);

  const handlePageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  const handleBloodTypeChange = (type: string) => {
    setBloodType(type);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (e: number) => {
    setpageSize(e);
    setCurrentPage(1);
  };

  return (
    <section className="py-5 overflow-y-auto md:py-10 grow">
      <div className="container space-y-6">
        <TableActions
          handlePageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCurrentPage={setCurrentPage}
          handleBloodTypeChange={handleBloodTypeChange}
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
