import express from "express";
import { createOwner ,getAllOwners ,deleteOwner } from "../controllers/ownerController.js";
const router = express.Router();


router.post("/create", createOwner);
router.get("/all", getAllOwners); // ✅ yeh GET route zaruri hai
router.delete("/deleted/:owner_id", deleteOwner);
export default router;