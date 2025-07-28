// productRoute.js
import express from "express";
import upload from "../upload/upload.js"; // ✅ import correct upload config
import { createProduct, getProducts } from "../controllers/productController.js";
import { getProductsByOwner } from "../controllers/productController.js";

const router = express.Router();

router.post("/create", upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/byowner/:owner_id", getProductsByOwner); // ✅ Add this line

export default router;
