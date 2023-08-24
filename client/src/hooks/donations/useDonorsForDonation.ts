import getDonorsForDonation from "@/services/donations/getDonorsForDonation";
import { useQuery } from "@tanstack/react-query";

const useDonorsForDonation = (search: string) => {
  return useQuery(["donorsForDonations", search], () =>
    getDonorsForDonation(search)
  );
};

export default useDonorsForDonation;
