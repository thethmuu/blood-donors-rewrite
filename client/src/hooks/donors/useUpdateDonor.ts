import { useMutation } from "@tanstack/react-query";

import updateDonor from "@/services/donors/updateDonor";

const useUpdateDonor = () => {
  return useMutation(updateDonor);
};

export default useUpdateDonor;
