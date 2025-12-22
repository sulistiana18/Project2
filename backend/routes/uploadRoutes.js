const express = require("express");
const router = express.Router();
const { uploadExcel } = require("../controllerS/uploadController");

router.post("/upload-excel", uploadExcel);

module.exports = router;
