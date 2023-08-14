import { authenticatedRequest } from "@/libs/axios";
import { GetDonorProps } from "@/types/donor";

const getDonors = async ({
  userId,
  pageNumber,
  pageSize,
  search,
}: GetDonorProps) => {
  let query = `userId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (search) {
    query += `&search=${search}`;
  }

  try {
    const response = await authenticatedRequest(`/donors?${query}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export default getDonors;
