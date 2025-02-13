import express from "express";
import {
  organisationLogin,
  organisationRegister,
} from "../controllers/organisation.controller";
import { sendNotification } from "../controllers/notification.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

// Organization routes
router.post("/register", organisationRegister);
router.post("/login", organisationLogin);
router.post("/send-notification", authenticate, sendNotification);

export default router;
