import { authenticatedRequest } from "@/libs/axios";
import { CreateDonor } from "@/types/donor";

const createDonor = async (data: CreateDonor) => {
  try {
    await authenticatedRequest.post(`/donors`, {
      ...data,
    });
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export default createDonor;
