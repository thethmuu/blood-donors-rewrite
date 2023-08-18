import { useQuery } from "@tanstack/react-query";

import getDonors from "@/services/donors/getDonors";
import { GetDonorProps } from "@/types/donor";

const useDonors = ({
  pageNumber,
  pageSize,
  search,
  bloodType,
}: GetDonorProps) => {
  return useQuery(["donors", pageNumber, pageSize, search, bloodType], () =>
    getDonors({ pageNumber, pageSize, search, bloodType })
  );
};

export default useDonors;
