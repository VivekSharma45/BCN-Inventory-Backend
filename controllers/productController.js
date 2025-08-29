import Product from "../models/product.js";
import Owner from "../models/owner.js";
import mongoose from "mongoose";
import { deleteMultipleImagesFromCloudinary } from "../utils/cloudinaryUtils.js";

// ✅ CREATE PRODUCT
export const createProduct = async (req, res) => {
    try {
        const { name, price, quantity, description, price_BCN, register, expiry, owner_name, unit ,product_quantity } = req.body;
        
        // Handle image uploads
        let image = [];
        console.log('📁 Files received:', req.files ? req.files.length : 0);
        
        if (req.files && req.files.length > 0) {
            image = req.files.map(file => {
                console.log('📄 Processing file:', {
                    originalname: file.originalname,
                    path: file.path,
                    filename: file.filename,
                    mimetype: file.mimetype
                });
                
                // If it's a Cloudinary URL (starts with http), use it directly
                if (file.path && file.path.startsWith('http')) {
                    console.log('✅ Cloudinary URL detected:', file.path);
                    return file.path;
                }
                
                // If it's a local filename, construct the full URL
                const localUrl = `${req.protocol}://${req.get('host')}/upload/${file.filename}`;
                console.log('📂 Local URL constructed:', localUrl);
                return localUrl;
            });
        }
        
        console.log('🖼️ Final image array:', image);

        if (!name || !price || !description || !owner_name || !product_quantity) {
            return res.status(400).json({ success: false, message: 'Name, price, description, owner name, and product quantity are required' });
        }

        const wordCount = description.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount < 5 || wordCount > 200) {
            return res.status(400).json({
                success: false,
                message: 'Description must be between 5 and 200 words.'
            });
        }

        // ✅ Find owner by owner_name (you can use phone/register for better uniqueness)
        const owner = await Owner.findOne({ owner_name });

        if (!owner) {
            return res.status(404).json({ success: false, message: 'Owner not found' });
        }

        const newProduct = new Product({
            name,
            price,
            quantity: quantity || undefined,
            description,
            price_BCN: price_BCN || undefined,
            register: register || undefined,
            expiry: expiry || undefined,
            image: image.length > 0 ? image : [],
            owner_name,
            product_quantity,
            unit: unit || undefined,
            owner_id: owner._id  // ✅ Use Mongo-generated ObjectId
        });

        await newProduct.save();

        return res.status(201).json({ success: true, message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error("Create Product Error:", error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ✅ GET PRODUCTS (with optional name filter)
export const getProducts = async (req, res) => {
    try {
        const { name } = req.query;
        let filter = {};
        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        }

        const products = await Product.find(filter);
        return res.status(200).json({ success: true, products });
    } catch (error) {
        console.error("Error in getProducts:", error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ✅ GET PRODUCT BY ID
export const getProductsByProductId = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, message: "Failed to fetch product" });
    }
};

// ✅ GET PRODUCTS BY OWNER
export const getProductsByOwner = async (req, res) => {
    try {
        const { owner_id } = req.params;
        const products = await Product.find({ owner_id });
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error("Error fetching owner-wise products:", error);
        res.status(500).json({ success: false, message: "Failed to fetch owner products" });
    }
};

// ✅ UPDATE PRODUCT
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, quantity, description, price_BCN, register, expiry, product_quantity, unit } = req.body;

        console.log('Update Product Request Body:', req.body);
        console.log('Update Product Files:', req.files);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }

        if (description) {
            const wordCount = description.trim().split(/\s+/).filter(Boolean).length;
            if (wordCount < 5 || wordCount > 200) {
                return res.status(400).json({ success: false, message: 'Description must be between 5 and 200 words.' });
            }
        }

        // First, get the existing product to preserve required fields
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const updateData = {
            name: name || existingProduct.name,
            price: price || existingProduct.price,
            quantity: quantity || existingProduct.quantity,
            unit: unit || existingProduct.unit,
            description: description || existingProduct.description,
            price_BCN: price_BCN || existingProduct.price_BCN,
            register: register || existingProduct.register,
            expiry: expiry || existingProduct.expiry,
            product_quantity: product_quantity || existingProduct.product_quantity,
            owner_name: existingProduct.owner_name, // Preserve existing owner_name
            owner_id: existingProduct.owner_id, // Preserve existing owner_id
        };

        // Handle images: combine existing images with new uploaded images
        let allImages = [];
        
        // Start with existing images from the database
        if (existingProduct.image && existingProduct.image.length > 0) {
            allImages = allImages.concat(existingProduct.image);
        }
        
        // Add new uploaded images
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => {
                // If it's a Cloudinary URL (starts with http), use it directly
                if (file.path && file.path.startsWith('http')) {
                    return file.path;
                }
                // If it's a local filename, construct the full URL
                if (process.env.NODE_ENV === 'production') {
                    console.warn('⚠️ Local file upload detected in production environment');
                    return file.path; // This should be a Cloudinary URL
                }
                return `${req.protocol}://${req.get('host')}/upload/${file.filename}`;
            });
            allImages = allImages.concat(newImages);
        }
        
        // Only update images if we have any images to set
        if (allImages.length > 0) {
            updateData.image = allImages;
        }

        console.log('Final Update Data:', updateData);

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        return res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error("Update Product Error:", error);
        return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
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

        // Delete images from Cloudinary (only if they are Cloudinary URLs)
        if (deletedProduct.image && deletedProduct.image.length > 0) {
            try {
                const cloudinaryUrls = deletedProduct.image.filter(url => url && url.startsWith('http'));
                if (cloudinaryUrls.length > 0) {
                    await deleteMultipleImagesFromCloudinary(cloudinaryUrls);
                }
            } catch (error) {
                console.error('Error deleting images from Cloudinary:', error);
                // Continue with deletion even if Cloudinary deletion fails
            }
        }

        return res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Delete Product Error:", error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
