// productRoute.js
import express from "express";
import upload from "../upload/upload.js"; // ✅ import correct upload config
import { createProduct, getProducts } from "../controllers/productController.js";
import { getProductsByOwner } from "../controllers/productController.js";
import { updateProduct } from "../controllers/productController.js";
import {deleteProduct} from "../controllers/productController.js";

const router = express.Router();

router.post("/create", upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/byowner/:owner_id", getProductsByOwner); // ✅ Add this line
router.put('/update/:id', upload.array('photos', 5), updateProduct);
router.delete('/delete/:id', deleteProduct );
export default router;
