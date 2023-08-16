import { useMutation } from "@tanstack/react-query";

import logout from "@/services/auth/logout";

const useLogout = () => {
  return useMutation(logout);
};

export default useLogout;
