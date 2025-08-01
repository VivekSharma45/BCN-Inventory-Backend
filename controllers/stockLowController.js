/*import Product from "../models/product.js";

export const getLowStockItems = async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 10;
    const products = await Product.find({ quantity: { $lt: threshold } });

    res.status(200).json({
      success: true,
      message: "Low stock items",
      products: products
    });

  } catch (error) {
    console.error("low stock fetch error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
*/