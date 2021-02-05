var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const cartController = require("../controller/CartController")
const auth = require("../middleware/auth")

// 加入购物车
router.post("/add",
    body("goodsId").notEmpty().isInt(),
    body("productNum").notEmpty().isInt(),
    auth,
    cartController.addCart
)

// 查询用户购物车路由
router.get("/", 
    auth, 
    cartController.getCart
)

module.exports = router;
