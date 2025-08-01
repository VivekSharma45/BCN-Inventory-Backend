import Product from "../models/product.js";
import StockIn from "../models/stockInModel.js";
import StockOut from "../models/stockOutModel.js";

export const stockIn = async (req, res) => {
  try {
    const { product_id, quantity, unit, note } = req.body;

    if (!product_id || !quantity ||!unit) {
      return res.status(400).json({ success: false, message: "Product ID and Quantity required" });
    }

    const product = await Product.findById(product_id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    product.quantity += Number(quantity);
    await product.save();

    await StockIn.create({ product_id, quantity, unit, note });

    res.status(200).json({ success: true, message: "Stock In recorded successfully" });
  } catch (err) {
    console.error("Stock in error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const stockOut = async (req, res) => {
  try {
    const { product_id, quantity, unit, note } = req.body;

    if (!product_id || !quantity ||!unit) {
      return res.status(400).json({ success: false, message: "Product ID and Quantity required" });
    }

    const product = await Product.findById(product_id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    if (product.quantity < quantity) {
      return res.status(400).json({ success: false, message: "Insufficient stock" });
    }

    product.quantity -= Number(quantity);
    await product.save();

    await StockOut.create({ product_id, quantity, unit, note });

    res.status(200).json({ success: true, message: "Stock Out recorded successfully" });
  } catch (err) {
    console.error("Stock out error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const getAllStockIn = async (req, res) => {
  try {
    const stockIns = await StockIn.find().populate("product_id");
    res.status(200).json({ success: true, stockIns });
  } catch (error) {
    console.error("Error fetching stock ins:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const getAllStockOut = async (req, res) => {
  try {
    const stockOuts = await StockOut.find().populate("product_id");
    res.status(200).json({ success: true, stockOuts }); // changed from allStockOut to stockOuts
  } catch (error) {
    console.error("Error fetching stock outs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getLowStock = async (req, res) => { 
  console.log("GET /api/stock/low called");

  try {
    const threshold = parseInt(req.query.threshold) || 10;
    const products = await Product.find({ quantity: { $lt: threshold } });

    res.status(200).json({
      success: true,
      message: "Low stock items fetched",
      products
    });
  } catch (error) {
    console.error("Low stock error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
