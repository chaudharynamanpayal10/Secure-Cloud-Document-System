const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: true,
            trim: true
        },

        originalname: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            required: true
        },

        size: {
            type: Number,
            required: true
        },

        s3Key: {
            type: String,
            required: true
        },

        s3Url: {
            type: String,
            required: true
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        isDeleted: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("File", fileSchema);