import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // 👈 1. Added CORS import
import connectDB from "./config/db.js";
import itemRoute from "./route/item.route.js";
import userRoute from "./route/user.route.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

// 2. Middleware Configuration
// This allows your React app (5173) to access this API (4001)
app.use(cors()); 
app.use(express.json()); 

// Connect to Database
connectDB();

// Basic Health Check Route
app.get("/", (req, res) => {
  res.send("KitUp Backend is running! 🚀");
});

// Defining routes
app.use("/item", itemRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});