const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadFile, getFiles, deleteFile, getFilesByClass } = require("../controller/fileController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/get-files/:classCode", getFilesByClass);
router.get("/:classCode/:teacherEmail", getFiles);
router.delete("/:id", deleteFile); 


module.exports = router;
