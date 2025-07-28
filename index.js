import express from 'express';
import cors from 'cors';
import connectDB from './db/connection.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/productRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import ownerRoutes from './routes/ownerRoutes.js';
import stockRoutes from './routes/stockRoutes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stock',stockRoutes);
app.use('/upload', express.static(path.join(__dirname, 'uploads')));
app.use('/api/owner', ownerRoutes);
app.listen(process.env.PORT ||5000, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);
})