import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface VerifiedUser {
  email: string;
  id: number;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user: VerifiedUser;
    }
  }
}

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized!", success: false });
  }

  const user = verify(token, process.env.SECRET as string);

  if (!user) {
    return res.status(403).json({ message: "Forbidden!", success: false });
  }

  req.user = user as VerifiedUser;
  next();
};

export default checkAuth;
