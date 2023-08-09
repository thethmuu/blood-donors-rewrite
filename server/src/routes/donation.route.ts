import { Router } from "express";
import {
  addDonation,
  getDonation,
  getDonations,
  updateDonation,
  removeDonation,
} from "../controllers/donation.controller";
import {
  validateAddDonationFields,
  validateAddDonorFields,
  validateUpdateDonationFields,
  validateUpdateDonorFields,
} from "../libs/validateSchema";

const router = Router();

router.get("/", getDonations);

router.get("/:id", getDonation);

router.post("/", validateAddDonationFields, addDonation);

router.patch("/:id", validateUpdateDonationFields, updateDonation);

router.delete("/:id", removeDonation);

export default router;
