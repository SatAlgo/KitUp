import express from "express";
import { addItem, getItems, deleteItem } from "../controller/item.controller.js";
import { upload } from "../utils/cloudinary.js"; // Import the multer config

const router = express.Router();

// Middleware: 'images' is the key name from frontend, 4 is max files
router.post("/add", upload.array("images", 4), addItem);
router.get("/all", getItems);
router.delete("/delete/:id", deleteItem);

export default router;