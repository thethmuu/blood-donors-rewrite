import { Router } from "express";
import {
  getDonors,
  getDonor,
  addDonor,
  updateDonor,
  removeDonor,
  getAvaliableDonors,
} from "../controllers/donor.controller";
import {
  validateAddDonorFields,
  validateUpdateDonorFields,
} from "../libs/validateSchema";

const router = Router();

router.get("/", getDonors);

router.get("/avaliable", getAvaliableDonors);

router.get("/:id", getDonor);

router.post("/", validateAddDonorFields, addDonor);

router.patch("/:id", validateUpdateDonorFields, updateDonor);

router.delete("/:id", removeDonor);

export default router;
