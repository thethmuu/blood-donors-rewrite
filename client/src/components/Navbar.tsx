import React from "react";
import Link from "next/link";

import useIsAuthorized from "@/hooks/auth/useIsAuthorized";

const Navbar = () => {
  const { data: isAuthorized, isLoading } = useIsAuthorized();

  return (
    <nav className="h-20 min-h-[5rem] text-white bg-primary">
      <div className="container flex items-center justify-between h-full mx-auto">
        <Link href={"/"} className="text-xl font-semibold">
          Blood Donors
        </Link>

        {!isLoading && isAuthorized ? (
          <Link
            className="inline-flex items-center justify-center px-4 py-2 text-sm text-black transition-all bg-white rounded-sm hover:bg-white/90 h-9"
            href="/donors"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-4 py-2 text-sm text-black transition-all bg-white rounded-sm hover:bg-white/90 h-9"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
