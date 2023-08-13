import { useMutation } from "@tanstack/react-query";

import updateDonor from "@/services/donors/updateDonor";

const useUpdateDonor = () => {
  useMutation(updateDonor);
};

export default useUpdateDonor;
