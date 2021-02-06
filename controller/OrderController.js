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

    async orderPay(req, res){
        let { id } = req.params;
        id = parseInt(id);req.user
        if(Number.isNaN(id)){
            return res.status(403).json(new ErrorModel("the params parameter is incorrect"))
        }
        const result = await orderService.orderPay(id, req.user.id);
        if(typeof result === "string"){
            return res.json(new ErrorModel(result));
        }
        return res.json(new SuccessModel("success"));
    }

    async getAll(req, res){
        const userId = req.user.id;
        const result = await orderService.getAllOrder(userId);
        if(typeof result === "string"){
            return res.json(new ErrorModel(result))
        }
        return res.json(new SuccessModel(result, "success"))
    }
}

module.exports = new OrderController();