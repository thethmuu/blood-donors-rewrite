import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../libs/prisma";
import { Prisma } from "@prisma/client";
export async function getDonors(req: Request, res: Response) {
  const { pageSize, pageNumber, search, bloodType } = req.query;

  const userId = req.user.id;

  const skip =
    (parseInt(pageNumber as string) - 1) * parseInt(pageSize as string);
  const take = parseInt(pageSize as string);

  const donorFindOptions: Prisma.DonorFindManyArgs = {
    skip: 0,
    where: {
      userId,
    },
    orderBy: [{ createdAt: "desc" }],
  };

  const totalCountFindOptions: Prisma.DonorCountArgs = {
    where: {
      userId,
      name: {
        contains: search as string,
      },
    },
  };

  if (typeof skip === "number" && skip > 0) {
    donorFindOptions.skip = skip;
  }
  if (take) {
    donorFindOptions.take = take;
  }

  if (search) {
    donorFindOptions.where.name = {
      contains: search as string,
    };
  }

  if (bloodType) {
    donorFindOptions.where.bloodType = bloodType as string;
    totalCountFindOptions.where.bloodType = bloodType as string;
  }

  try {
    const donors = await prisma.donor.findMany(donorFindOptions);

    const totalCount = await prisma.donor.count(totalCountFindOptions);

    const pageCount = Math.ceil(totalCount / take);

    return res.status(200).json({ donors, pageCount, success: true });
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
      include: {
        donations: {
          orderBy: { createdAt: "desc" },
        },
      },
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

  const { name, dob, phone, address, bloodType } = req.body;
  const userId = req.user.id;
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

  const { name, dob, phone, address, bloodType } = req.body;
  const userId = req.user.id;
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

export async function getAvaliableDonors(req: Request, res: Response) {
  const { pageSize, pageNumber, search, bloodType } = req.query;

  const userId = req.user.id;

  const skip =
    (parseInt(pageNumber as string) - 1) * parseInt(pageSize as string);
  const take = parseInt(pageSize as string);

  const fourMonthsAgo = new Date();
  fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
  fourMonthsAgo.setUTCHours(0, 0, 0, 0);

  const avaliableDonorsFindOptions: Prisma.DonorFindManyArgs = {
    where: {
      userId,
      donations: { some: { lastDate: { lte: fourMonthsAgo } } },
    },
    orderBy: [{ createdAt: "desc" }],
  };

  const totalCountFindOptions: Prisma.DonorCountArgs = {
    where: {
      userId,
      donations: { some: { lastDate: { lte: fourMonthsAgo } } },
      name: {
        contains: search as string,
      },
    },
  };

  if (typeof skip === "number" && skip > 0) {
    avaliableDonorsFindOptions.skip = skip;
  }
  if (take) {
    avaliableDonorsFindOptions.take = take;
  }

  if (search) {
    avaliableDonorsFindOptions.where.name = {
      contains: search as string,
    };
  }

  if (bloodType) {
    avaliableDonorsFindOptions.where.bloodType = bloodType as string;
    totalCountFindOptions.where.bloodType = bloodType as string;
  }

  try {
    const avaliableDonors = await prisma.donor.findMany(
      avaliableDonorsFindOptions
    );

    const totalCount = await prisma.donor.count(totalCountFindOptions);

    const pageCount = Math.ceil(totalCount / take);

    return res
      .status(200)
      .json({ donors: avaliableDonors, pageCount, sucess: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
}
