import axios from "axios";

const isAuthorized = async () => {
  try {
    const response = await axios.get("/api/isAuthorized");

    return response.data.authorized;
  } catch (error: any) {
    console.log(error);
  }
};

export default isAuthorized;
