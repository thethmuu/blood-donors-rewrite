"use client";

import React from "react";

import Loading from "@/conponents/Loading";
import { DataTable } from "@/conponents/dashboard/data-table";
import { columns } from "@/conponents/dashboard/columns";

import useDonors from "@/hooks/donors/useDonors";

const Dashboard = () => {
  const { data, isLoading, isError, refetch, error } = useDonors();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="container py-10 grow">
      <DataTable columns={columns} data={data.donors} />
    </section>
  );
};

export default Dashboard;
