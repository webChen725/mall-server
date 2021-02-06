var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const addressController = require("../controller/AddressController")
const auth = require("../middleware/auth")

//  添加收货地址
router.post("/add",
    body("userName").notEmpty().isString(),
    body("addr").notEmpty().isString(),
    body("tel").notEmpty().isString(),
    auth,
    addressController.create
)

// 收货地址更新
router.patch("/:id",
    auth,
    addressController.updateAddr
)

// 删除收货地址
router.delete("/:id",
    auth,
    addressController.deleteAddr
)

// 查询用户地址
router.get("/",
    auth,
    addressController.getAddr
)

module.exports = router;
