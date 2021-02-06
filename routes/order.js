var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const orderController = require("../controller/OrderController")
const auth = require("../middleware/auth")

// 生成订单路由
router.post("/create",
    body("productNum").notEmpty().isInt(),
    body("goodId").notEmpty().isInt(),
    body("addressId").notEmpty().isInt(),
    auth,
    orderController.createOrder
)


module.exports = router;