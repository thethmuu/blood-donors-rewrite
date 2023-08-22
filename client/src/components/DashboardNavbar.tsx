import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "./ui/button";
import LinkItem from "./LinkItem";
import useLogout from "@/hooks/auth/useLogout";
import { useToast } from "./ui/use-toast";
import Sidebar from "./Sidebar";

const Links = [
  { name: "အလှူရှင်အားလုံး", src: "/donors" },
  { name: "ယခုလှူနိုင်သူများ", src: "/donors/avaliable" },
  { name: "အလှူရှင်အသစ်", src: "/donors/create" },
  { name: "လှူဒါန်းမှူအသစ်", src: "/donations/create" },
];

const DashboardNavbar = () => {
  const currentPath = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isLoading, isSuccess, isError, error } = useLogout();

  const currentPathName = Links.find((item) => {
    return item.src === currentPath;
  });

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }

    if (isError) {
      toast({
        variant: "destructive",
        title: (error as Error).message,
      });
    }
  }, [isSuccess, isError, router, error, toast]);

  return (
    <nav className="h-20 min-h-[5rem] text-white bg-primary">
      <div className="container flex items-center justify-between h-full mx-auto">
        <aside className="flex md:hidden">
          <Sidebar navItems={Links} mutate={mutate} />
        </aside>

        <Link
          href={"/"}
          className="text-xl font-semibold text-center w-fit md:w-fit md:text-2xl"
        >
          Blood Donors
        </Link>

        <p className="block text-sm font-medium md:hidden">
          {currentPathName?.name}
        </p>

        <div className="items-center hidden gap-5 md:flex">
          {Links.map((item) => (
            <LinkItem key={item.src} item={item} />
          ))}

          <Button
            onClick={() => mutate()}
            className="font-semibold text-black bg-secondary hover:bg-secondary/90"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
