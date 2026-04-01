import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    maxlength: [60, "Title too long"],
    trim: true 
  },
  description: { 
    type: String, 
    required: true, 
    maxlength: [500, "Description too long"] 
  },
  price: { type: Number, required: true, min: 0 },
  category: { 
    type: String, 
    required: true, 
    enum: ["Academic Books", "Electronics", "Graphics & Drawing", "Hostel Essentials", "Lab Gear", "Other"] 
  },
  condition: { 
    type: String, 
    required: true, 
    enum: ["Brand New", "Gently Used", "Well Used"] 
  },
  images: {
    type: [String],
    validate: [val => val.length <= 4, 'Max 4 images allowed']
  },
  pickupPoint: { type: String, required: true, maxlength: 100 },
  isNegotiable: { type: Boolean, default: false },
  status: { type: String, enum: ["Available", "On Hold", "Sold"], default: "Available" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);
export default Item;