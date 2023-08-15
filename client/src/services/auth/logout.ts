import { auth } from "@/libs/axios";

const logout = async () => {
  try {
    await auth.post("/logout");
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export default logout;
