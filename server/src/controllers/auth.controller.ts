import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import createToken from "../libs/createToken";

export async function registerUser(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    return res
      .status(400)
      .json({ message: "Email already existed!", success: false });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await prisma.user.create({
      data: { name, email, hashedPassword },
    });

    return res
      .status(201)
      .json({ message: "Register success!", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
}

export async function loginUser(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized!", success: false });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!isCorrectPassword) {
      return res
        .status(401)
        .json({ message: "Invalid credentials!", success: false });
    }
    const payload = { id: user.id, email: user.email };
    const token = createToken(payload);
    const expirationTime = 14 * 24 * 60 * 60 * 1000;
    res.cookie("token", token, {
      maxAge: expirationTime,
      httpOnly: true,
      sameSite: false,
      secure: true,
    });

    return res.status(200).json({ message: "Login success!", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
}
export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Bye Bye!", success: true });
};
