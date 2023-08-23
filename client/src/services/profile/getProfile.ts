import { authenticatedRequest } from "@/libs/axios";

const getProfile = async () => {
  try {
    const response = await authenticatedRequest(`/profile`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export default getProfile;
