import axios from "axios";

export const authenticatedRequest = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_SERVICE_API,
});
