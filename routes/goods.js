var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const goodsController = require("../controller/GoodsController")
const auth = require("../middleware/auth")
const adminAuth = require("../middleware/adminAuth")

// 新建商品
router.post("/create",
    body("productName").notEmpty().isString(),
    body("productPrice").notEmpty().isFloat(),
    body("productCover").notEmpty().isString(),
    body("desc").notEmpty().isString(),
    body("sub_title").notEmpty().isString(),
    body("productNum").notEmpty().isInt(),
    body("productDetail").notEmpty().isString(),
    auth,
    adminAuth,
    goodsController.createGoods
)


module.exports = router;