import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import itemRoute from "./route/item.route.js"
const app = express();

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;
// connect to mongodb
try {
  await mongoose.connect(URI); 
  console.log("Connected to mongoDB ✅");
} catch (error) {
  console.log("Error: ", error);
}

// defining routes
app.use("/item", itemRoute)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
