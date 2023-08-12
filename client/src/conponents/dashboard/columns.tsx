"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Donor } from "@/types/donor";

export const columns: ColumnDef<Donor>[] = [
  {
    accessorKey: "phone",
    header: "နံပါတ်",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          အမည်
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </p>
      );
    },
  },
  {
    accessorKey: "bloodType",
    header: "သွေး",
  },
];
