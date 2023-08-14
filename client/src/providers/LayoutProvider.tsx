"use client";

import React from "react";
import { usePathname } from "next/navigation";

import Navbar from "@/components/Navbar";
import DashboardNavbar from "@/components/DashboardNavbar";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const currentPath = usePathname();

  return (
    <main className="flex flex-col w-full h-full overflow-hidden">
      {currentPath === "/" ? <Navbar /> : <DashboardNavbar />}
      {children}
    </main>
  );
};

export default LayoutProvider;
