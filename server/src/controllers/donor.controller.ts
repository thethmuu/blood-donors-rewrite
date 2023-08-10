import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../libs/prisma";
export async function getDonors(req: Request, res: Response) {
  const { userId } = req.query;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "UserId is required!", success: false });
  }

  try {
    const donors = await prisma.donor.findMany({
      orderBy: [{ createdAt: "desc" }],
      where: { userId: parseInt(userId as string) },
    });

    return res.status(200).json({ donors, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
}

export async function getDonor(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required!", success: false });
  }

  try {
    const donor = await prisma.donor.findUnique({
      where: {
        id: parseInt(id),
      },
      include: { donations: true },
    });

    if (!donor) {
      return res
        .status(404)
        .json({ message: "Donor not found!", success: false });
    }

    return res.status(200).json({ donor, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
}

export async function addDonor(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, dob, phone, address, bloodType, userId } = req.body;

  try {
    await prisma.donor.create({
      data: {
        name,
        dob,
        phone,
        address,
        bloodType,
        userId,
      },
    });

    return res
      .status(201)
      .json({ message: "Donor created successfully!", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
}

export async function updateDonor(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required!", success: false });
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, dob, phone, address, bloodType, userId } = req.body;

  try {
    await prisma.donor.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        dob,
        phone,
        address,
        bloodType,
        userId,
      },
    });

    return res
      .status(200)
      .json({ message: "Donor updated successfully!", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
}

export async function removeDonor(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required!", success: false });
  }

  try {
    await prisma.donor.delete({ where: { id: parseInt(id) } });

    return res.status(200).json({ message: "Donor deleted!", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
}
