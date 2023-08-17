import getDonorsForDonation from "@/services/donations/getDonorsForDonation";
import { useQuery } from "@tanstack/react-query";

const useDonorsForDonation = () => {
  return useQuery(["donorsForDonations"], getDonorsForDonation);
};

export default useDonorsForDonation;
