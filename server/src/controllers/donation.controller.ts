import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../libs/prisma";
import { Prisma } from "@prisma/client";
export async function getDonations(req: Request, res: Response) {
  const { userId, pageNumber, pageSize, search } = req.query;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "UserId is required!", success: false });
  }

  const skip =
    (parseInt(pageNumber as string) - 1) * parseInt(pageSize as string);
  const take = parseInt(pageSize as string);

  const donationFindOptions: Prisma.DonationFindManyArgs = {
    skip: 0,
    where: {
      userId: parseInt(userId as string),
    },
    orderBy: [{ count: "desc" }, { createdAt: "desc" }],
    include: { donor: true },
  };

  if (typeof skip === "number" && skip > 0) {
    donationFindOptions.skip = skip;
  }
  if (take) {
    donationFindOptions.take = take;
  }

  if (search) {
    donationFindOptions.where.donor = {
      name: {
        contains: search as string,
      },
    };
  }

  try {
    const donations = await prisma.donation.findMany(donationFindOptions);

    return res.status(200).json({ donations, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
}

export async function getDonation(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required!", success: false });
  }

  try {
    const donation = await prisma.donation.findUnique({
      where: {
        id: parseInt(id),
      },
      include: { donor: true },
    });

    if (!donation) {
      return res
        .status(404)
        .json({ message: "Donation not found!", success: false });
    }

    return res.status(200).json({ donation, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
}

export async function addDonation(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { lastDate, donorId, userId } = req.body;

  const previousCount = await prisma.donation.count({ where: { donorId } });

  const currentCount = previousCount + 1;

  try {
    await prisma.donation.create({
      data: {
        donorId,
        count: currentCount,
        userId,
        lastDate,
      },
    });

    return res
      .status(201)
      .json({ message: "Donation created successfully!", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
}

export async function updateDonation(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required!", success: false });
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { lastDate, donorId: newDonorId, userId } = req.body;

  const { donorId: previousDonorId, count: previousDonorCount } =
    await prisma.donation.findUnique({
      where: { id: parseInt(id) },
    });

  let count;

  try {
    if (newDonorId !== previousDonorId) {
      const newDonorPreviousCount = await prisma.donation.count({
        where: { donorId: newDonorId },
      });
      count = newDonorPreviousCount + 1;
    } else {
      count = previousDonorCount;
    }

    await prisma.donation.update({
      where: { id: parseInt(id) },
      data: {
        donorId: newDonorId,
        count,
        userId,
        lastDate,
      },
    });
    return res
      .status(200)
      .json({ message: "Donation updated successfully!", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
}

export async function removeDonation(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id is required!", success: false });
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await prisma.donation.delete({
      where: { id: parseInt(id) },
    });

    return res
      .status(200)
      .json({ message: "Donation deleted!", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
}
