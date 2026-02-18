import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    // Add id if you want to keep your custom numeric IDs
    id: { type: Number }, 
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    // Changed to optional or provided a default because some items lack it
    image: {
        type: String,
        default: "default.png" 
    },
    // Changed to optional because your assignment items lack it
    contact: {
        type: String,
        required: false 
    },
    description: {
        type: String,
        required: true
    },
    // Added link field found in your JSON
    link: {
        type: String
    }
});

const Item = mongoose.model("Item", itemSchema);
export default Item;