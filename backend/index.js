// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors"; // 👈 1. Added CORS import
// import connectDB from "./config/db.js";
// import itemRoute from "./route/item.route.js";
// import userRoute from "./route/user.route.js";

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 4001;

// // 2. Middleware Configuration
// // This allows your React app (5173) to access this API (4001)
// app.use(cors()); 
// app.use(express.json()); 

// // Connect to Database
// connectDB();

// // Basic Health Check Route
// app.get("/", (req, res) => {
//   res.send("KitUp Backend is running! 🚀");
// });

// // Defining routes
// app.use("/item", itemRoute);
// app.use("/user", userRoute);

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import connectDB from "./config/db.js";
import itemRoute from "./route/item.route.js";
import userRoute from "./route/user.route.js";

// Load environment variables
dotenv.config();

const app = express();
// Render automatically provides a PORT, or it defaults to 4001
const PORT = process.env.PORT || 4001;

// Middleware Configuration
app.use(cors()); 
app.use(express.json()); 

// Connect to Database
// Ensure your MONGODB_URI is in Render's Environment Variables!
connectDB();

// Basic Health Check Route
app.get("/", (req, res) => {
  res.status(200).send("KitUp Backend is running! 🚀");
});

// Defining routes
app.use("/item", itemRoute);
app.use("/user", userRoute);

// CRITICAL FIX FOR RENDER: 
// Binding to "0.0.0.0" allows Render's load balancer to detect your server.
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});