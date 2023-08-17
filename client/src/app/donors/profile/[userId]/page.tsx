"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Cake, CalendarDays, Clock1, Heart, Home, Phone } from "lucide-react";

import Loading from "@/components/Loading";

import formatDate from "@/libs/formatDate";

import useDonor from "@/hooks/donors/useDonor";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const currentPath = usePathname();
  const router = useRouter();

  const userId = currentPath.split("/").pop() || "";
  const [lastDonationDate, setLastDonationDate] = useState("");
  const [dob, setDob] = useState("");

  const { data, isLoading, isError, isSuccess, error } = useDonor(
    parseInt(userId)
  );

  useEffect(() => {
    if (isSuccess) {
      if (data.donor.donations.length > 0) {
        const lastDate = data.donor.donations[0].lastDate;

        setLastDonationDate(formatDate(lastDate));
      }

      if (data.donor.dob) {
        const date = data.donor.dob;

        setDob(formatDate(date));
      }
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="overflow-y-auto grow">
      <div className="container flex flex-col justify-between min-h-full py-5 shadow-md md:py-10">
        <h2 className="text-2xl font-semibold text-primary">
          {data.donor.name}
        </h2>

        <div className="space-y-5">
          {/* blood type */}
          <article className="flex items-center gap-4 px-5 shadow h-14">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
              <Heart size={18} fill="white" color="white" />
            </div>

            <div>
              <p>သွေး</p>
              <p className="text-sm font-semibold">{data.donor.bloodType}</p>
            </div>
          </article>

          {/* phone */}
          <article className="flex items-center gap-4 px-5 shadow h-14">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
              <Phone size={18} fill="white" color="white" />
            </div>

            <div>
              <p>ဖုန်း</p>
              <p className="text-sm font-semibold">{data.donor.phone}</p>
            </div>
          </article>

          {/* dob */}
          <article className="flex items-center gap-4 px-5 shadow h-14">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
              <Cake size={18} color="white" />
            </div>

            <div>
              <p>မွေးနေ့</p>
              <p className="text-sm font-semibold">{dob}</p>
            </div>
          </article>

          {/* address */}
          <article className="flex items-center gap-4 px-5 shadow h-14">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
              <Home size={18} color="white" />
            </div>

            <div>
              <p>လိပ်စာ</p>
              <p className="text-sm font-semibold">{data.donor.address}</p>
            </div>
          </article>

          {/* last donation date */}
          <article className="flex items-center gap-4 px-5 shadow h-14">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
              <CalendarDays size={18} color="white" />
            </div>

            <div>
              <p>နောက်ဆုံးလှူခဲ့သည့်ရက်</p>
              <p className="text-sm font-semibold">{lastDonationDate}</p>
            </div>
          </article>

          {/* donations count */}
          <article className="flex items-center gap-4 px-5 shadow h-14">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
              <Clock1 size={18} color="white" />
            </div>

            <div>
              <p>လှူဖူးသည့်အကြိမ်ရေ</p>
              <p className="text-sm font-semibold">
                {data.donor.donations.length}
              </p>
            </div>
          </article>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>

          <Button
            onClick={() => {
              router.push(`/donors/edit/${userId}`);
            }}
            variant={"outline"}
          >
            Edit
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
