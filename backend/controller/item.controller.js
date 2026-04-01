import Item from "../model/item.model.js";

// 1. Add New Item with Cloudinary Images
export const addItem = async (req, res) => {
  try {
    // req.body contains text fields, req.files contains the uploaded images
    const { 
        title, description, price, category, 
        condition, pickupPoint, isNegotiable, seller 
    } = req.body;

    // Map through the uploaded files to get their Cloudinary URLs
    const imageUrls = req.files ? req.files.map(file => file.path) : [];

    if (imageUrls.length === 0) {
        return res.status(400).json({ message: "At least one image is required" });
    }

    const newItem = new Item({ 
        title, 
        description, 
        price, 
        category, 
        condition, 
        images: imageUrls, // Array of URLs from Cloudinary
        pickupPoint, 
        isNegotiable, 
        seller 
    });

    await newItem.save();
    res.status(201).json({ message: "Item listed successfully!", item: newItem });
  } catch (error) {
    console.error("Upload Error:", error.message);
    res.status(400).json({ message: "Validation Error", error: error.message });
  }
};

// 2. Get Items (with optional Category Filter)
export const getItems = async (req, res) => {
  try {
    const { category } = req.query;
    let query = { status: "Available" };
    if (category) query.category = category;

    const items = await Item.find(query)
      // Added "email" to the list of fields to fetch from the User model
      .populate("seller", "name surname email mobNumber address") 
      .sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error: error.message });
  }
};

// 3. Delete Item
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};