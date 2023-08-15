import React, { useEffect, useState } from "react";
import Link from "next/link";

import useIsAutherized from "@/hooks/auth/useIsAutherized";

const Navbar = () => {
  const { data: isAutherized, isLoading } = useIsAutherized();

  return (
    <nav className="h-20 min-h-[5rem] text-white bg-primary">
      <div className="container flex items-center justify-between h-full mx-auto">
        <Link href={"/"} className="text-2xl font-semibold">
          Blood Donors
        </Link>

        {!isLoading && isAutherized ? (
          <Link
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-black rounded-sm bg-secondary hover:bg-secondary/90 h-9"
            href="/donors"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-black rounded-sm bg-secondary hover:bg-secondary/90 h-9"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
