export interface Donor {
  id: number;
  address: string;
  bloodType: string;
  createdAt: Date;
  updatedAt: Date;
  dob: Date;
  name: string;
  phone: string;
  userId: number;
}

export interface CreateDonor {
  name: string;
  dob: string;
  phone: string;
  address: string;
  bloodType: string;
}

export interface UpdateDonor {
  bloodType: string;
  phone: string;
  address: string;
  dob: Date;
}

export interface GetDonorProps {
  pageNumber: number;
  pageSize: number;
  search: string;
  bloodType?: string;
}
