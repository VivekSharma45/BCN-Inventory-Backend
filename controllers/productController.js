import Product from "../models/product.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// ✅ CREATE PRODUCT
export const createProduct = async (req, res) => {
    try {
        const { name, price, quantity, description, price_BCN, register, expiry, owner_name, owner_id ,unit} = req.body;
        const image =req.file? req.file.filename:null;

        // ❌ Fix logic: You had wrong validation. `|| description` always passes.
        if (!name || !price || !quantity || !description || !price_BCN || !register || !expiry ||!owner_name ||!owner_id ||!image ||!unit) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // ✅ Description word count check (min 5, max 200 words)
        const wordCount = description.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount < 5 || wordCount > 200) {
            return res.status(400).json({
                success: false,
                message: 'Description must be between 5 and 200 words.'
            });
        }

        const newProduct = new Product({ name, price, quantity, description, price_BCN, register, expiry, image, owner_name, owner_id, unit });
        await newProduct.save();

        return res.status(201).json({ success: true, message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error("Create Product Error:", error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



// ✅ GET PRODUCTS (With optional name filter)
export const getProducts = async (req, res) => {
    try {
        const { name } = req.query;
        let filter = {};
        if (name) {
            filter.name = { $regex: name, $options: 'i' }; // Case-insensitive search
        }

        const products = await Product.find(filter);
        return res.status(200).json({ success: true, products });
    } catch (error) {
        console.error("Error in getProducts:", error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

//Get product by owner
export const getProductsByOwner = async (req, res) => {
  try {
    const { owner_id} = req.params;
    const products = await Product.find({owner_id});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching owner-wise products:", error);
    res.status(500).json({ success: false, message: "Failed to fetch owner products" });
  }
};


/*

// ✅ UPDATE PRODUCT
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, quantity, description, price_BCN, register, expiry } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }

        // ✅ Word count validation (same as create)
        if (description) {
            const wordCount = description.trim().split(/\s+/).filter(Boolean).length;
            if (wordCount < 5 || wordCount > 200) {
                return res.status(400).json({
                    success: false,
                    message: 'Description must be between 5 and 200 words.'
                });
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, quantity, description, price_BCN, register, expiry },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        return res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error("Update Product Error:", error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



// ✅ DELETE PRODUCT
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        return res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Delete Product Error:", error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};*/
