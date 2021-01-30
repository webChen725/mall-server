var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const userController = require("../controller/UserController")
const auth = require("../middleware/auth")

/* GET users listing. */
router.post('/create', 
  body("userName").notEmpty().isString(),
  body("userPwd").notEmpty().isString(),
  body("email").notEmpty().isString().isEmail(),
  userController.register);

router.post('/login', 
  body("userName").notEmpty().isString(),
  body("userPwd").notEmpty().isString(),
  userController.login);

router.post('/mail',
  body("userName").notEmpty().isString(),
  body("email").notEmpty().isString().isEmail(),
  userController.sendMainCode);

router.patch('/reset',
  body("userName").notEmpty().isString(),
  body("code").notEmpty().isString(),
  body("userPwd").notEmpty().isString(),
  userController.resetPassword);

router.patch('/update',
  auth,
  userController.updateUser);
module.exports = router;
