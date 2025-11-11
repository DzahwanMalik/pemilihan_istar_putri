import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "e-voting-candidates",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

const uploadImage = multer({ storage });

export default uploadImage;
