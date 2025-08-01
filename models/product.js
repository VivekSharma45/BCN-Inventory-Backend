import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    unit:{type:String, enum:[ 'kg', 'liter', 'piece', 'packet', 'box' ], required: true},
    price_BCN: {type: Number, required: true},
    register: {type: String, required: true},
    expiry: {type: String, required: true},
    owner_name:{type:String, required:true},
    description: {type: String, required: true},
    owner_id:{type:mongoose.Schema.Types.ObjectId,
        ref: 'ProductOwner',
        required: true

    },
    image: {type: String,  required: true},




}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;