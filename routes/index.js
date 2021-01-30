var express = require('express');
var router = express.Router();
var multer = require("multer");
var path = require("path");
const indexController = require("../controller/IndexController");
const uploader = multer({
  dest: path.join(__dirname, "../public", "upload")
})

/* GET home page. */
router.post('/upload', uploader.single("file"), indexController.uploadFile);

module.exports = router;
