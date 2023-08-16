import { useQuery } from "@tanstack/react-query";

import getDonor from "@/services/donors/getDonor";

const useDonor = (id: number) => {
  return useQuery(["donor", id], () => getDonor(id));
};

export default useDonor;
