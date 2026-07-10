// Upload File Controller

const uploadFile = (req, res) => {

    if (!req.file) {

        return res.status(400).json({
            success: false,
            message: "No file selected"
        });

    }

    res.status(200).json({

        success: true,

        message: "File Uploaded Successfully",

        file: {

            fileName: req.file.key,
            originalName: req.file.originalname,
            fileUrl: req.file.location,
            size: req.file.size,
            type: req.file.mimetype

        }

    });

};

const fs = require("fs");
const path = require("path");

// Get All Uploaded Files

const getFiles = (req, res) => {

    const uploadPath = path.join(__dirname, "../uploads");

    fs.readdir(uploadPath, (err, files) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Unable to fetch files"
            });

        }

        res.status(200).json({

            success: true,

            files

        });

    });

};

// Delete File

const deleteFile = (req, res) => {

    const fileName = req.params.fileName;

    const filePath = path.join(__dirname, "../uploads", fileName);

    fs.unlink(filePath, (err) => {

        if (err) {

            return res.status(404).json({
                success: false,
                message: "File Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "File Deleted Successfully"
        });

    });

};

module.exports = {
    uploadFile,
    getFiles,
    deleteFile
};