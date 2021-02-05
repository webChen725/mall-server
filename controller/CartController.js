const { validationResult } = require('express-validator');
const { SuccessModel, ErrorModel } = require("../utils/resModel");
const cartService = require("../service/CartService");
const { pageQuery } = require("../utils/tools")

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

    /**
     * 查询用户购物车数据
     */
    async getCart(req, res){
        const userId = req.user?.id;
        const result = await cartService.getCart(userId);
        if(typeof result === "string"){
            return res.json(new ErrorModel(result));
        }
        return res.json(new SuccessModel(result, "succcess"))
    }
}

module.exports = new CartController();