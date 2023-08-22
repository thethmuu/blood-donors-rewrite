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
      className={`text-sm font-medium transition hover:text-black/90 ${
        currentPath === item.src ? "text-black/90" : ""
      }`}
    >
      {item.name}
    </Link>
  );
};

export default LinkItem;
