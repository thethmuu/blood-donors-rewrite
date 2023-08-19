import { authenticatedRequest } from "@/libs/axios";
import { GetDonorProps } from "@/types/donor";

const getAvaliableDonors = async ({
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
    const response = await authenticatedRequest.get(
      `/donors/avaliable?${query}`
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export default getAvaliableDonors;
