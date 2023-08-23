import { useQuery } from "@tanstack/react-query";

import getProfile from "@/services/profile/getProfile";

const useProfile = () => {
  return useQuery(["profile"], getProfile);
};

export default useProfile;
