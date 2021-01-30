const { validationResult } = require('express-validator');
const userService = require("../service/UserService");
const { SuccessModel, ErrorModel } = require("../utils/resModel");

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
}

module.exports = new UserController();