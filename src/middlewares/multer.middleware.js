import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure temp directory exists
const TEMP_DIR = "./public/temp";
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_DIR);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, `${baseName}-${timestamp}${ext}`);
  },
});

// // File filter
// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
//   if (allowedFileTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Unsupported file type"), false);
//   }
// };

export const upload = multer({
  storage,
//   fileFilter,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});
