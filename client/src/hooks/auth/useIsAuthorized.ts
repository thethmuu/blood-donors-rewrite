import { useQuery } from "@tanstack/react-query";

import isAuthorized from "@/services/auth/isAuthorized";

const useIsAuthorized = () => {
  return useQuery(["isAuthorized"], isAuthorized);
};

export default useIsAuthorized;
