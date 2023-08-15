import { useMutation } from "@tanstack/react-query";

import login from "@/services/auth/login";

const useLogin = () => {
  return useMutation(login);
};

export default useLogin;
