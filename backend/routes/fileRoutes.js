const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const verifyToken = require("../middleware/authMiddleware");

const {
    uploadFile,
    getFiles,
    deleteFile
} = require("../controllers/fileController");

// Upload Route
router.post(
    "/upload",
    verifyToken,
    upload.single("document"),
    uploadFile
);

router.get(
    "/files",
    verifyToken,
    getFiles
);

router.delete(
    "/delete/:fileName",
    verifyToken,
    deleteFile
);

module.exports = router;