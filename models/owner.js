import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  owner_name: { type: String, required: true },
  phone: { type: Number, required: true },
  register: { type: String, required: true },
  gst: { type: String, required: false }
}, { timestamps: true });

const Owner = mongoose.model("Owner", ownerSchema);
export default Owner;
