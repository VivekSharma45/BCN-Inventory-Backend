import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  owner_name: { type: String, required: true },
  phone: { type: Number, required: true },
  owner_id: { type: String, required: true },
  register: { type: String, required: true },
  product: { type: String, required: true }
}, { timestamps: true });

const Owner = mongoose.model("Owner", ownerSchema);
export default Owner;
