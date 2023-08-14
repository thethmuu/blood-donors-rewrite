import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller";
import {
  validateRegisterUserFields,
  validateLogInUserFields,
} from "../libs/validateSchema";

const router = Router();

router.post("/register", validateRegisterUserFields, registerUser);

router.post("/login", validateLogInUserFields, loginUser);

router.post("/logout", logoutUser);

export default router;
