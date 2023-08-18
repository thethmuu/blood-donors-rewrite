import { useQuery } from "@tanstack/react-query";

import { GetDonorProps } from "@/types/donor";
import getAvaliableDonors from "@/services/donors/getAvaliableDonors";

const useAvaliableDonors = ({
  pageNumber,
  pageSize,
  search,
  bloodType,
}: GetDonorProps) => {
  return useQuery(
    ["avaliableDonors", pageNumber, pageSize, search, bloodType],
    () => getAvaliableDonors({ pageNumber, pageSize, search, bloodType })
  );
};

export default useAvaliableDonors;
