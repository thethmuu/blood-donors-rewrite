import React from "react";
import Link from "next/link";

import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="h-20 min-h-[5rem] text-white bg-primary">
      <div className="container flex items-center justify-between h-full mx-auto">
        <h2 className="text-2xl font-semibold">Blood Donors</h2>

        <Link
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-black rounded-sm bg-secondary hover:bg-secondary/90 h-9"
          href="/donors"
        >
          Dashboard
        </Link>

        {/* <Button className="font-semibold text-black bg-secondary hover:bg-secondary/90">
          Login
        </Button> */}
      </div>
    </nav>
  );
};

export default Navbar;
