import React from "react";

import { Button } from "../ui/button";
import LinkItem from "./LinkItem";

const Links = [
  { name: "အလှူရှင်အားလုံး", src: "/dashboard" },
  { name: "ယခုလှူနိုင်သူများ", src: "/dashboard/donors/avaliable" },
  { name: "အလှူရှင်အသစ်", src: "/dashboard/donors/create" },
  { name: "လှူဒါန်းမှူအသစ်", src: "/dashboard/donations/create" },
];

const Navbar = () => {
  return (
    <nav className="h-20 text-white bg-primary">
      <div className="container flex items-center justify-between h-full mx-auto">
        <h2 className="text-2xl font-semibold">Blood Donors</h2>

        <div className="flex items-center gap-5">
          {Links.map((item) => (
            <LinkItem key={item.src} item={item} />
          ))}

          <Button className="font-semibold text-black bg-secondary hover:bg-secondary/90">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
