import { useQuery } from "@tanstack/react-query";

import isAutherized from "@/services/auth/isAutherized";

const useIsAutherized = () => {
  return useQuery(["isAutherized"], isAutherized);
};

export default useIsAutherized;
