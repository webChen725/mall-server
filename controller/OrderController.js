const { validationResult } = require('express-validator');
const { SuccessModel, ErrorModel } = require("../utils/resModel");
const orderService = require("../service/OrderService");

class OrderController{
    async createOrder(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(new ErrorModel(errors.array()));
        }
        const userId = req.user.id;
        req.body.userId = userId;
        const result = await orderService.createOrder(req.body);
        if(typeof result === "string"){
            return res.json(new ErrorModel(result))
        }
        return res.json(new SuccessModel(result, "success"));
    }
}

module.exports = new OrderController();