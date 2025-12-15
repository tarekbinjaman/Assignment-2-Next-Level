import { Router } from "express";
import { authController } from "./auth.controller";
import { userControllers } from "../user/user.controller";

const router = Router();

router.post("/signup", userControllers.createUser);
router.post("/signin", authController.loginUser);

export const authRoutes = router;