import { useMutation } from "@tanstack/react-query";

import createDonor from "@/services/donors/createDonor";

const useCreateDonor = () => {
  useMutation(createDonor);
};

export default useCreateDonor;
