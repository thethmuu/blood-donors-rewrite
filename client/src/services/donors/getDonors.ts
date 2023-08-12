import { authenticatedRequest } from "@/lib/axios";

const getDonors = async () => {
  try {
    const response = await authenticatedRequest("/donors?userId=1");

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export default getDonors;
