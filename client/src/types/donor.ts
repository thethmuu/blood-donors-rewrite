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
  dob: Date;
  phone: string;
  address: string;
  bloodType: string;
  userId: number;
}

export interface UpdateDonor {
  bloodType: string;
  phone: string;
  address: string;
  dob: Date;
  userId: number;
}

export interface GetDonorProps {
  userId: string;
  pageNumber: number;
  pageSize: number;
  search: string;
}
