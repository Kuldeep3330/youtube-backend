import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use async file operations
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) {
    throw new Error("No file path provided for upload.");
  }

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("✅ File uploaded to Cloudinary:", response.secure_url);

    // Delete the local file after successful upload
    await fs.unlink(localFilePath);
    return response;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error.message);
    await fs.unlink(localFilePath); // Ensure local file cleanup on failure
    throw new Error("Cloudinary upload failed.");
  } 
};
