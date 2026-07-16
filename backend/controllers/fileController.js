const File = require("../models/File");

const {
    DeleteObjectCommand,
    GetObjectCommand
} = require("@aws-sdk/client-s3");

const s3 = require("../config/s3");

// ==========================================
// Upload File
// ==========================================

const uploadFile = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "No file selected"

            });

        }

        const newFile = await File.create({

            filename: req.file.key,

            originalname: req.file.originalname,

            type: req.file.mimetype,

            size: req.file.size,

            s3Key: req.file.key,

            s3Url: req.file.location,

            uploadedBy: req.user.id

        });

        return res.status(201).json({

            success: true,

            message: "File Uploaded Successfully",

            file: newFile

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Upload Failed"

        });

    }

};

// ==========================================
// Dashboard
// ==========================================

const getDashboard = async (req, res) => {

    try {

        const files = await File.find({

            uploadedBy: req.user.id

        });

        const totalFiles = files.length;

        let storageUsed = 0;

        files.forEach(file => {

            storageUsed += file.size;

        });

        const uploadedToday = files.filter(file => {

            const today = new Date();

            const created = new Date(file.createdAt);

            return (

                today.getDate() === created.getDate() &&

                today.getMonth() === created.getMonth() &&

                today.getFullYear() === created.getFullYear()

            );

        }).length;

        res.status(200).json({

            success: true,

            totalFiles,

            uploadedToday,

            storageUsed

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Dashboard Error"

        });

    }

};
// ==========================================
// Get All Files
// ==========================================

const getFiles = async (req, res) => {

    try {

        const files = await File.find({

            uploadedBy: req.user.id

        }).sort({

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            count: files.length,

            files

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Unable to Fetch Files"

        });

    }

};
// ==========================================
// Download File
// ==========================================

const downloadFile = async (req, res) => {

    try {

        const file = await File.findOne({

            _id: req.params.id,

            uploadedBy: req.user.id

        });

        if (!file) {

            return res.status(404).json({

                success: false,

                message: "File Not Found"

            });

        }

        // Redirect user to the S3 file URL
        return res.status(200).json({

            success: true,

            downloadUrl: file.s3Url

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Download Failed"

        });

    }

};
// ==========================================
// Delete File
// ==========================================

const deleteFile = async (req, res) => {

    try {

        const file = await File.findById(req.params.id);

        if (!file) {

            return res.status(404).json({

                success: false,

                message: "File Not Found"

            });

        }

        // Optional Ownership Check

        if (file.uploadedBy.toString() !== req.user.id) {

            return res.status(403).json({

                success: false,

                message: "Unauthorized"

            });

        }

        // Delete from AWS S3

        await s3.send(

            new DeleteObjectCommand({

                Bucket: process.env.AWS_BUCKET_NAME,

                Key: file.s3Key

            })

        );

        // Delete from MongoDB

        await File.findByIdAndDelete(req.params.id);

        return res.status(200).json({

            success: true,

            message: "File Deleted Successfully"

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Delete Failed"

        });

    }

};

// ==========================================
// Exports
// ==========================================

module.exports = {

    uploadFile,

    getDashboard,

    getFiles,

    downloadFile,

    deleteFile

};