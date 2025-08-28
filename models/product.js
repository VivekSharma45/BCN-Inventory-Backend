import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, },
    unit: { type: String, enum: [ 'kg', 'liter', 'piece', 'packet', 'box' ] },
    price_BCN: { type: Number, required: true },
    product_quantity: { type : Number, required: true},
    register: { type: String, required: true },
    expiry: { type: String,  },
    owner_name: { type: String, required: true },
    description: { type: String, required: true },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner', // ✅ Correct reference model
        required: true
    },
    image: { type: [String], default:[], required: true },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
