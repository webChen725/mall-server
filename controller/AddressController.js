const { validationResult } = require('express-validator');
const { SuccessModel, ErrorModel } = require("../utils/resModel");
const addressService = require("../service/AddressService");

class CartController{
    async create(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(new ErrorModel(errors.array()));
        }
        req.body.userId = req?.user?.id;
        const result = await addressService.create(req.body);
        if(typeof result === "string"){
            return res.json(new ErrorModel(result));
        }
        return res.json(new SuccessModel(result, "success"))
    }

    async updateAddr(req, res){
        let { id } = req.params;
        id = parseInt(id);req.user
        if(Number.isNaN(id)){
            return res.status(403).json(new ErrorModel("the params parameter is incorrect"))
        }
        const result = await addressService.updateAddr(req.body, id, req.user.id);
        if(typeof result === "string"){
            return res.json(new ErrorModel(result));
        }
        return res.json(new SuccessModel("success"))
    }

    async deleteAddr(req, res){
        let { id } = req.params;
        id = parseInt(id);req.user
        if(Number.isNaN(id)){
            return res.status(403).json(new ErrorModel("the params parameter is incorrect"))
        }
        const result = await addressService.deleteAddr(id);
        if(typeof result === "string"){
            return res.json(new ErrorModel(result));
        }
        return res.json(new SuccessModel("success"))
    }
}

module.exports = new CartController();