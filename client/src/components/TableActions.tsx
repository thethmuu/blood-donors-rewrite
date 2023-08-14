"use client";

import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

interface TableActionsProps {
  handlePageSizeChange: (e: number) => void;
  pageSize: number;
  searchQuery: string;
  setSearchQuery: (data: string) => void;
}

const TableActions = ({
  handlePageSizeChange,
  pageSize,
  searchQuery,
  setSearchQuery,
}: TableActionsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [searchData, setSearchData] = useState(searchQuery);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const query = setTimeout(() => {
      setSearchQuery(searchData);
    }, 500);

    return () => clearTimeout(query);
  }, [searchData, setSearchQuery]);

  if (!isMounted) {
    return;
  }

  return (
    <section className="flex flex-col items-center justify-between gap-3 sm:gap-0 sm:flex-row">
      <div className="flex items-center gap-2 w-fit">
        <p className="text-xs font-semibold text-primary/60">Show</p>
        <Select
          defaultValue={`${pageSize}`}
          onValueChange={(e) => handlePageSizeChange(parseInt(e))}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-xs font-semibold text-primary/60">entries</p>
      </div>

      <Input
        value={searchData}
        onChange={(e) => setSearchData(e.target.value)}
        className=" w-96"
        placeholder="Search with name ..."
        autoFocus
      />
    </section>
  );
};

export default TableActions;
