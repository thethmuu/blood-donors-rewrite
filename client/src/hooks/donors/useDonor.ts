import { useQuery } from "@tanstack/react-query";

import getDonor from "@/services/donors/getDonor";
import { LargeNumberLike } from "crypto";

const useDonor = (id: number) => {
  useQuery(["donor"], () => getDonor(id));
};

export default useDonor;
