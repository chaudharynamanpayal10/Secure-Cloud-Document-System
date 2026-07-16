const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {

    uploadFile,

    getFiles,

    getDashboard,

    downloadFile,

    deleteFile

} = require("../controllers/fileController");

// ======================================
// Dashboard
// ======================================

router.get(

    "/dashboard",

    authMiddleware,

    getDashboard

);

// ======================================
// Upload File
// ======================================

router.post(

    "/upload",

    authMiddleware,

    upload.single("file"),

    uploadFile

);

// ======================================
// Get All Files
// ======================================

router.get(

    "/",

    authMiddleware,

    getFiles

);

// ======================================
// Download File
// ======================================

router.get(

    "/download/:id",

    authMiddleware,

    downloadFile

);

// ======================================
// Delete File
// ======================================

router.delete(

    "/:id",

    authMiddleware,

    deleteFile

);

module.exports = router;