import express from "express";
import { createOwner ,getAllOwners } from "../controllers/ownerController.js";
const router = express.Router();


router.post("/create", createOwner);
router.get("/", getAllOwners); // ✅ yeh GET route zaruri hai

export default router;