import { useMutation } from "@tanstack/react-query";

import createDonor from "@/services/donors/createDonor";

const useCreateDonor = () => {
  return useMutation(createDonor);
};

export default useCreateDonor;
