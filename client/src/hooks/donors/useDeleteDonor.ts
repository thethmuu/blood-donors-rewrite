import { useMutation } from "@tanstack/react-query";

import deleteDonor from "@/services/donors/deleteDonor";

const useDeleteDonor = () => {
  useMutation(deleteDonor);
};

export default useDeleteDonor;
