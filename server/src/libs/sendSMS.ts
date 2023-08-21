import axios from "axios";
import dotenv from "dotenv";

const sendSMS = async (phone: string, message: string) => {
  dotenv.config();
  const body = {
    to: phone,
    message,
    sender: "DevelopedByThet",
  };

  try {
    const res = await axios.post(process.env.SMSPOH_URL, body, {
      headers: {
        Authorization: `Bearer ${process.env.SMSPOH_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log(res.statusText);
  } catch (error) {
    console.log(error);
  }
};

export default sendSMS;
