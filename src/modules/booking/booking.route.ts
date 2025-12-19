import { Router } from "express";
import auth from "../../middlewares/auth";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/", auth("admin", "customer"), bookingController.createBooking);

export const bookingRoutes = router;