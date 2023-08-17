import { authenticatedRequest } from "@/libs/axios";

const getDonorsForDonation = async () => {
  try {
    const response = await authenticatedRequest("/donations/donors");

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export default getDonorsForDonation;
