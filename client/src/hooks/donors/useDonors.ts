import { useQuery } from "@tanstack/react-query";

import getDonors from "@/services/donors/getDonors";
import { GetDonorProps } from "@/types/donor";

const useDonors = ({ pageNumber, pageSize, search }: GetDonorProps) => {
  return useQuery(["donors", pageNumber, pageSize, search], () =>
    getDonors({ pageNumber, pageSize, search })
  );
};

export default useDonors;
