const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const config = require("../config/key");

const s3 = new AWS.S3({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});

function setUpload(bucket) {
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: bucket,
      acl: "public-read-write",
      key: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        cb(null, Date.now().toString() + extension);
      },
    }),
  }).single("file");
  return upload;
}

module.exports = setUpload;
