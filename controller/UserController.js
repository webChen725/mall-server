const { validationResult } = require('express-validator');
const userService = require("../service/UserService");
const { SuccessModel, ErrorModel } = require("../utils/resModel");
const { jwtSign } = require("../utils/jwtHandler");

class UserController {
    async register(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(new ErrorModel(errors.array()))
        }
        const result = await userService.register(req.body);
        if(typeof result === "string"){
            return res.json(new ErrorModel(result))
        }else{
            return res.json(new SuccessModel("success"));
        }
    }

    async login(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(new ErrorModel(errors.array()))
        }
        const result = await userService.login(req.body);
        if(typeof result === "string"){
            return res.json(new ErrorModel(result))
        }else{
            delete result.userPwd;  /* 删除返回数据中的密码项 */
            const token = jwtSign(result); /* 生成token返回用户 */
            return res.json(new SuccessModel({token}, "success"));
        }
    }

    async sendMainCode(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(new ErrorModel(errors.array()))
        }
        const result = await userService.sendMailCode(req.body);
        if(typeof result == "string"){
            return res.json(new ErrorModel(result))
        }else{
            return res.json(new SuccessModel("success"))
        }
    }

    async resetPassword(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(new ErrorModel(errors.array()))
        }
        const result = await userService.resetPassword(req.body);
        if(typeof result === "string"){
            return res.json(new ErrorModel(result));
        }else{
            return res.json(new SuccessModel("success"));
        }
    }
}

module.exports = new UserController();