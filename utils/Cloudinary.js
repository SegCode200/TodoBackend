import { v2 as cloudinary } from "cloudinary";
import ENV from "../config/config.js";

// Replace these values with your Cloudinary account details
cloudinary.config({
  cloud_name: ENV.CLOUD_NAME,
  api_key: ENV.CLOUD_API,
  api_secret: ENV.CLOUD_SECRET,
  secure: true,
});

export default cloudinary;
