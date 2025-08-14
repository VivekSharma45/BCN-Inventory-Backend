import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/connection.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/productRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import ownerRoutes from './routes/ownerRoutes.js';
import stockRoutes from './routes/stockRoutes.js';

dotenv.config(); // ✅ load env vars

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Allow ALL origins (not recommended for production, but works everywhere)
app.use(cors());

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/owner', ownerRoutes);

// ✅ Static file serving (uploads)
app.use('/upload', express.static(path.join(__dirname, 'uploads')));

// ✅ Start server
app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);
});
