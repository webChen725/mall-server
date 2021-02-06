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

// 删除商品
router.delete("/:id",
    auth,
    adminAuth,
    goodsController.deleteGoods
)


// 更新商品信息
router.patch("/:id",
    auth,
    adminAuth,
    goodsController.updateGoods
)

// 获取商品信
router.get("/",
    goodsController.getGoods
)

// 商品搜索
router.get("/search", 
    goodsController.searchGoods
)
module.exports = router;