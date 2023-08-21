import { authenticatedRequest } from "@/libs/axios";

const getDonorsForDonation = async (search: string) => {
  try {
    const response = await authenticatedRequest(
      `/donations/donors?search=${search}`
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export default getDonorsForDonation;
