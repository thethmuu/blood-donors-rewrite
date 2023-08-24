import { Request, Response } from "express";
import prisma from "../libs/prisma";
export async function getProfile(req: Request, res: Response) {
  const userId = req.user.id;

  try {
    const profile = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true, phone: true },
    });

    if (!profile) {
      return res
        .status(404)
        .json({ message: "User not found!", success: false });
    }

    return res.status(200).json({ profile, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
}
