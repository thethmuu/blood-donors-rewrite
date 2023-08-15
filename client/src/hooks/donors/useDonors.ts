import { useQuery } from "@tanstack/react-query";

import getDonors from "@/services/donors/getDonors";
import { GetDonorProps } from "@/types/donor";

const useDonors = ({ userId, pageNumber, pageSize, search }: GetDonorProps) => {
  return useQuery(["donors", userId, pageNumber, pageSize, search], () =>
    getDonors({ userId, pageNumber, pageSize, search })
  );
};

export default useDonors;
