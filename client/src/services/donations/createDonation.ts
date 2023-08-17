import { authenticatedRequest } from "@/libs/axios";
import { CreateDonation } from "@/types/donation";

const createDonor = async (data: CreateDonation) => {
  try {
    await authenticatedRequest.post(`/donations`, {
      ...data,
    });
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export default createDonor;
