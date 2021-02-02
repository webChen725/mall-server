var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const cartController = require("../controller/CartController")
const auth = require("../middleware/auth")

// 加入购物车
router.post("/add",
    body("productId").notEmpty().isInt(),
    body("productNum").notEmpty().isInt(),
    auth,
    cartController.addCart
)

module.exports = router;
