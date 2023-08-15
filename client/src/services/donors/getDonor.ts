import { authenticatedRequest } from "@/libs/axios";

const getDonor = async (id: number) => {
  try {
    const response = await authenticatedRequest.get(`/donors/${id}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export default getDonor;
