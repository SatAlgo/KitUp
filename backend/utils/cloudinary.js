import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import pkg from 'multer-storage-cloudinary';

// Extract the constructor safely
const CloudinaryStorage = pkg.CloudinaryStorage || pkg;

import dotenv from 'dotenv';
dotenv.config();

// 1. Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Storage Setup
// We use 'new CloudinaryStorage' but handle potential undefined errors
let storage;
try {
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'KitUp_Marketplace',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
  });
} catch (err) {
  console.error("❌ CLOUDINARY STORAGE ERROR:", err.message);
}

// 3. Export Multer instance
export const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB per file
});