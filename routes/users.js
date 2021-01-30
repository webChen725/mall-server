var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const userController = require("../controller/UserController")

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

module.exports = router;
