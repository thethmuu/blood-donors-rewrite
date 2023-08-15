import axios from "axios";

const isAutherized = async () => {
  try {
    const response = await axios.get("/api/isAutherized");

    return response.data.autherized;
  } catch (error: any) {
    console.log(error);
  }
};

export default isAutherized;
