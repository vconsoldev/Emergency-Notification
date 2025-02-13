import express from "express";

import { authenticate } from "../middlewares/auth.middleware.js";
import { registerUser, loginUser } from "../controllers/user.controller.js";

const router = express.Router();

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);


export default router;
