import express from 'express';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/v1/users', userRoutes);

export default app;
