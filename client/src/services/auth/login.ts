import { auth } from "@/libs/axios";

interface LoginProps {
  email: string;
  password: string;
}

const login = async (data: LoginProps) => {
  try {
    const response = await auth.post("/login", {
      ...data,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export default login;
