import { parse, differenceInMonths } from "date-fns";
import { Donor, Donation } from "@prisma/client";

export interface DonorProps extends Donor {
  donations: Donation[];
}

function isAvailable(donor: DonorProps) {
  const lastDonationDate = donor.donations.reduce((latestDate, donation) => {
    const donationDate = donation.lastDate;
    return donationDate > latestDate ? donationDate : latestDate;
  }, new Date(0));

  const today = new Date();
  const diffMonths = differenceInMonths(today, lastDonationDate);

  return diffMonths >= 4;
}

export default isAvailable;
