import { authenticatedRequest } from "@/libs/axios";

const deleteDonor = async (id: number) => {
  try {
    await authenticatedRequest.delete(`/donors/${id}`);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export default deleteDonor;
