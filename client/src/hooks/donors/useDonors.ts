import { useQuery } from "@tanstack/react-query";

import getDonors from "@/services/donors/getDonors";

const useDonors = () => {
  return useQuery(["donors"], getDonors);
};

export default useDonors;
