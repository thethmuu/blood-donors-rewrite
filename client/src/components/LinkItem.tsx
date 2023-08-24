"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkItemProps {
  item: {
    name: string;
    src: string;
  };
}

const LinkItem = ({ item }: LinkItemProps) => {
  const currentPath = usePathname();

  return (
    <Link
      href={item.src}
      className={`text-sm font-medium transition-all hover:text-slate-900 hover:bg-white duration-500 p-1.5 rounded-md ${
        currentPath === item.src ? "text-slate-900 bg-white" : ""
      }`}
    >
      {item.name}
    </Link>
  );
};

export default LinkItem;
