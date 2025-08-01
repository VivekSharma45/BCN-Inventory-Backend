import mongoose from "mongoose";

const stockInSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    unit:{type:String, enum:[ 'kg', 'liter', 'piece', 'packet', 'box' ], required: true},

    date: { type: Date, default: Date.now },
    note: { type: String },
});

const StockIn = mongoose.model("StockIn", stockInSchema);
export default StockIn;
