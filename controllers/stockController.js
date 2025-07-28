import Product from "../models/product.js";
import StockLog from "../models/stockLog.js";

export const stockIn = async (req , res) =>{
    try{
        console.log("Request Body:", req.body);

        const {product_id, quantity, note} = req.body;

        if(!product_id ||!quantity){
            return res.status(400).json({success: false, message: "Product_id && Quantity are required"});

        }
        const product = await Product.findById(product_id);
        if(!product) return res.status(404).json({success: false, message: "Product not found"});

        product.quantity += Number(quantity);
        await product.save();

        await StockLog.create({product_id, quantity, type:"in", note});
        res.status(200).json({success: true, message: "Stock Added Successfully"});

    }catch(err){
        console.error("Stock in error",err);
        res.status(500).json({success: false, message: "Internal server error"});

}
};

export const stockOut = async (req, res)=>{
    try{
        const{product_id, quantity, note}= req.body;
        if(!product_id ||!quantity){
            return res.status(400).json({success: false, message: "Product_id && Quantity not found"});
        }
        const product = await Product.findById(product_id);
        if(!product) return res.status(404).json({success: false, message: "Product not found"});

        if(product.quantity<quantity){
            return res.status(400).json({success: false, message: "Insufficient Stock"});
        }


        product.quantity -= Number(quantity);
        await product.save();

        await StockLog.create({product_id, quantity, type:"out", note});
        res.status(200).json({success: true, message: "Removed Successfully"});
    }catch(err){
        console.error("Stock out error", err);
        res.status(500).json({success: false, message: "Internal server error"});
    }

};