const { validationResult } = require('express-validator');
const { SuccessModel, ErrorModel } = require("../utils/resModel");
const cartService = require("../service/CartService");

class CartController{
    async addCart(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(new ErrorModel(errors.array()));
        }
        req.body.userId = req?.user?.id;
        const result = await cartService.addCart(req.body);
        if(typeof result === "string"){
            return res.json(new ErrorModel(result));
        }
        return res.json(new SuccessModel(result, "success"))
    }
}

module.exports = new CartController();