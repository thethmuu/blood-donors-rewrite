import { useQuery } from "@tanstack/react-query";

import getDonor from "@/services/donors/getDonor";

const useDonor = (id: number) => {
  useQuery(["donor"], () => getDonor(id));
};

export default useDonor;
