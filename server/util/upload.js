const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const config = require("../config/key");

const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_DEFAULT_REGION,
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
