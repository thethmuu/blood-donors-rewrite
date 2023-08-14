import { sign } from "jsonwebtoken";

interface TokenPayload {
  id: number;
  email: string;
}

const SECRET = process.env.SECRET as string;

const createToken = (payload: TokenPayload) => {
  return sign(payload, SECRET, { expiresIn: "14d" });
};

export default createToken;
