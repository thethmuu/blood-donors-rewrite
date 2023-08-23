"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";

import {
  Select as ShadSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

import useIsMounted from "@/hooks/useIsMounted";

interface TableActionsProps {
  handlePageSizeChange: (e: number) => void;
  handleBloodTypeChange: (type: string) => void;
  pageSize: number;
  searchQuery: string;
  setSearchQuery: (data: string) => void;
  setCurrentPage: (data: number) => void;
}

const BloodTypeOptions = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "O", label: "O" },
  { value: "AB", label: "AB" },
  { value: "-A", label: "-A" },
  { value: "-B", label: "-B" },
  { value: "-O", label: "-O" },
  { value: "-AB", label: "-AB" },
];

const TableActions = ({
  handlePageSizeChange,
  pageSize,
  searchQuery,
  setSearchQuery,
  setCurrentPage,
  handleBloodTypeChange,
}: TableActionsProps) => {
  const isMounted = useIsMounted();

  const [searchData, setSearchData] = useState(searchQuery);

  useEffect(() => {
    const query = setTimeout(() => {
      setSearchQuery(searchData);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(query);
  }, [searchData, setSearchQuery, setCurrentPage]);

  if (!isMounted) {
    return;
  }

  return (
    <section className="flex flex-col items-center justify-between gap-3 md:gap-0 md:flex-row">
      <div className="flex items-center gap-2 w-fit">
        <p className="text-xs font-semibold text-primary/60">Show</p>
        <ShadSelect
          defaultValue={`${pageSize}`}
          onValueChange={(e) => handlePageSizeChange(parseInt(e))}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem className="cursor-pointer" value="10">
                10
              </SelectItem>
              <SelectItem className="cursor-pointer" value="25">
                25
              </SelectItem>
              <SelectItem className="cursor-pointer" value="50">
                50
              </SelectItem>
              <SelectItem className="cursor-pointer" value="100">
                100
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </ShadSelect>
        <p className="text-xs font-semibold text-primary/60">entries</p>
      </div>

      <div className="flex flex-col items-center gap-2 md:flex-row">
        <Input
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          className="sm:w-96 w-80"
          placeholder="Search with name ..."
          autoFocus
        />

        <Select
          options={BloodTypeOptions}
          placeholder="Blood Types"
          onChange={(e) => handleBloodTypeChange(e?.value as string)}
          classNames={{
            control: () => "w-36 text-sm",
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 12,
            colors: {
              ...theme.colors,
              primary: "#e11d48",
              primary25: "rgba(225, 29, 72, 0.25)",
            },
          })}
          isClearable
        />
      </div>
    </section>
  );
};

export default TableActions;
