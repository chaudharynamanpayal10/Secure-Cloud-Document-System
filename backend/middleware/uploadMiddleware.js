const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const s3 = require("../config/s3");

const upload = multer({

    storage: multerS3({

        s3: s3,

        bucket: process.env.AWS_BUCKET_NAME,

        metadata: function (req, file, cb) {
            cb(null, {
                fieldName: file.fieldname
            });
        },

        key: function (req, file, cb) {

            const uniqueName =
                Date.now() + path.extname(file.originalname);

            cb(null, uniqueName);

        }

    }),

    fileFilter: (req, file, cb) => {

        const allowedTypes = [

            "application/pdf",

            "image/png",

            "image/jpeg",

            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

        ];

        if (allowedTypes.includes(file.mimetype)) {

            cb(null, true);

        } else {

            cb(new Error("Only PDF, DOCX, JPG and PNG allowed"));

        }

    },

    limits: {

        fileSize: 10 * 1024 * 1024

    }

});

module.exports = upload;