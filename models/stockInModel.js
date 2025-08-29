import mongoose from "mongoose";

const stockInSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 0 }, // agar na bhejo to default 0
  unit: { 
    type: String, 
    enum: ['kg', 'liter', 'piece', 'packet', 'box', ''], // 👈 empty string allowed
    default: '' 
  },
  product_quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  note: { type: String, default: "" }
});

const StockIn = mongoose.model("StockIn", stockInSchema);
export default StockIn;
