import express from "express";
import userRoutes from "./routes/user.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import { authenticate } from "./middlewares/auth.middleware.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

app.use("/api/v1/users", userRoutes);

app.use(authenticate);
export default app;
