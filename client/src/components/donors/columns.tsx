"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Donor } from "@/types/donor";
import Link from "next/link";

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
    cell: ({ row }) => {
      const userId = row.original.id;

      return (
        <Link
          href={`/donors/profile/${userId}`}
          className="font-semibold transition-all text-primary hover:text-primary/80"
        >
          {row.original.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "bloodType",
    header: "သွေး",
  },
];
