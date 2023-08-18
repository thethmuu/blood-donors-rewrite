import { authenticatedRequest } from "@/libs/axios";
import { GetDonorProps } from "@/types/donor";

const getDonors = async ({
  pageNumber,
  pageSize,
  search,
  bloodType,
}: GetDonorProps) => {
  let query = `pageNumber=${pageNumber}&pageSize=${pageSize}`;

  if (search) {
    query += `&search=${search}`;
  }

  if (bloodType) {
    query += `&bloodType=${bloodType}`;
  }

  try {
    const response = await authenticatedRequest(`/donors?${query}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export default getDonors;
