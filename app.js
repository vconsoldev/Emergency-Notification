import express from "express";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import { auth } from "./middlewares/auth.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/v1/users", userRoutes);

app.use(auth);
export default app;
