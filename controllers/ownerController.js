import Owner from "../models/owner.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

//create owner

export const createOwner = async (req, res) => {
    try{
        const{company_name, owner_name, phone, owner_id, register, product } = req.body;
        if(!company_name ||!owner_name ||!phone ||!owner_id ||!register ||!product){
            return res.status(400).json({success:false, message:"All field are required" })
        }
        const newOwner = new Owner({company_name, owner_name, phone, owner_id, register, product});
        await newOwner.save();
        
        return res.status(201).json({ success: true, message: 'Product created successfully', owner: newOwner });


    }catch(error){
        console.error("Create Owner Error:",error);
        return res.status(500).json({success:false, message:"Internal server error"});
    }

    };
 // Get owner
   
 export const getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.find();

    return res.status(200).json({
      success: true,
      message: "Owner list fetched successfully",
      owners,
    });

  } catch (error) {
    console.error("Get All Owners Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};