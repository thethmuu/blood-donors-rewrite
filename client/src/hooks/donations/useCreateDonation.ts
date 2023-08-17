import { useMutation } from "@tanstack/react-query";

import createDonation from "@/services/donations/createDonation";

const useCreateDonation = () => {
  return useMutation(createDonation);
};

export default useCreateDonation;
