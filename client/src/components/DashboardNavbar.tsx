import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import LinkItem from "./LinkItem";
import useLogout from "@/hooks/auth/useLogout";
import { useToast } from "./ui/use-toast";
import Link from "next/link";

const Links = [
  { name: "အလှူရှင်အားလုံး", src: "/donors" },
  { name: "ယခုလှူနိုင်သူများ", src: "/donors/avaliable" },
  { name: "အလှူရှင်အသစ်", src: "/donors/create" },
  { name: "လှူဒါန်းမှူအသစ်", src: "/donations/create" },
];

const DashboardNavbar = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isLoading, isSuccess, isError, error } = useLogout();

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
        <Link href={"/"} className="text-2xl font-semibold">
          Blood Donors
        </Link>

        <div className="flex items-center gap-5">
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
