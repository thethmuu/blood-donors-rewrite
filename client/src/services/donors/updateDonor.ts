import { authenticatedRequest } from "@/libs/axios";
import { UpdateDonor } from "@/types/donor";

const updateDonor = async ({ id, data }: { id: number; data: UpdateDonor }) => {
  try {
    await authenticatedRequest.patch(`/donors/${id}`, {
      ...data,
    });
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export default updateDonor;
