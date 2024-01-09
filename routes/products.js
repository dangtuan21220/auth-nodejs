const express = require("express");
const productController = require("../controllers/productController");
const { verifyToken } = require("../controllers/verifyToken");
const router = express.Router();

// get all
router.get("/", verifyToken, productController.getAllProducts);
router.get("/testing", verifyToken, productController.getAllProductsTesting);

module.exports = router;
