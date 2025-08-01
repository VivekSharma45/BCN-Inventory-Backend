import express from 'express';
import {  stockIn, stockOut, getAllStockIn, getAllStockOut, getLowStock } from '../controllers/stockController.js';


const router = express.Router();

router.post('/in', stockIn);
router.post('/out', stockOut);
router.get("/all", getAllStockIn); 
router.get("/allStockOut", getAllStockOut); 
router.get('/low', getLowStock);



export default router;