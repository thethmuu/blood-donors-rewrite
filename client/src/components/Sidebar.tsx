"use client";

import React from "react";
import { Menu, UserCircle } from "lucide-react";
import { Separator } from "@radix-ui/react-select";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UseMutateFunction } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import useIsMounted from "@/hooks/useIsMounted";

interface SidebarProps {
  navItems: {
    name: string;
    src: string;
  }[];
  mutate: UseMutateFunction<void, unknown, void, unknown>;
}

const Sidebar = ({ navItems, mutate }: SidebarProps) => {
  const currentPath = usePathname();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="bg-primary/80" side={"left"}>
        <SheetHeader className="flex flex-col items-center mt-5 text-sm font-medium text-white">
          <UserCircle size={50} />
          <p>Admin</p>
          <p>admin@gmail.com</p>
        </SheetHeader>

        <Separator className="w-full h-0.5 bg-white my-5" />

        <SheetDescription className="flex flex-col items-center gap-4 text-white">
          {navItems.map((item) => (
            <SheetClose
              className={`w-full px-4 py-2 hover:bg-pink-300 transition-all rounded-sm ${
                currentPath === item.src ? "bg-pink-300" : ""
              }`}
              key={item.src}
              asChild
            >
              <Link
                href={item.src}
                className={`text-sm font-medium transition hover:text-black/90 ${
                  currentPath === item.src ? "text-black/90" : ""
                }`}
              >
                {item.name}
              </Link>
            </SheetClose>
          ))}
        </SheetDescription>

        <Separator className="w-full h-0.5 bg-white my-5" />

        <SheetFooter>
          <Button
            onClick={() => mutate()}
            className="font-semibold text-black bg-secondary hover:bg-secondary/90"
          >
            Logout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
