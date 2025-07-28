import mongoose from "mongoose";


const stockLogSchema = new mongoose.Schema({
    product_id:{type: mongoose.Schema.Types.ObjectId, ref: "Product", required:true },
    type:{type: String, enum:["in","out"], required: true},
    quantity:{type: Number, required: true},
    date:{type: Date, default: Date.now},
    note:{type: String},
});
 
const StockLog = mongoose.model("StockLog", stockLogSchema);
export default StockLog;