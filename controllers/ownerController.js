import Owner from "../models/owner.js";
import mongoose from "mongoose";

// ✅ CREATE OWNER
export const createOwner = async (req, res) => {
    try {
        const { company_name, owner_name, phone, register, gst } = req.body;

        if (!company_name || !owner_name || !phone || !register ) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newOwner = new Owner({
            company_name,
            owner_name,
            phone,
            register,
            gst
        });

        await newOwner.save();

        return res.status(201).json({ success: true, message: 'Owner created successfully', owner: newOwner });
    } catch (error) {
        console.error("Create Owner Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ✅ GET ALL OWNERS
export const getAllOwners = async (req, res) => {
    try {
        const owners = await Owner.find();
        return res.status(200).json({ success: true, message: "Owner list fetched successfully", owners });
    } catch (error) {
        console.error("Get All Owners Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// DELETE OWNER

export const deleteOwner = async (req, res) => {
    try {
        const { owner_id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(owner_id)) {
            return res.status(400).json({ success: false, message: 'Invalid Owner ID' });
        }

        const deletedOwner = await Owner.findByIdAndDelete(owner_id);

        if (!deletedOwner) {
            return res.status(404).json({ success: false, message: 'Owner not found' });
        }

        return res.status(200).json({ success: true, message: 'Owner deleted successfully' });
    } catch (error) {
        console.error("Delete Owner Error:", error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
