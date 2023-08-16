import { Router } from "express";
import {
  addDonation,
  getDonation,
  getDonations,
  updateDonation,
  removeDonation,
  getDonorsForDonations,
} from "../controllers/donation.controller";
import {
  validateAddDonationFields,
  validateUpdateDonationFields,
} from "../libs/validateSchema";

const router = Router();

router.get("/", getDonations);

router.get("/donors", getDonorsForDonations);

router.get("/:id", getDonation);

router.post("/", validateAddDonationFields, addDonation);

router.patch("/:id", validateUpdateDonationFields, updateDonation);

router.delete("/:id", removeDonation);

export default router;
