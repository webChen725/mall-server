const { validationResult } = require('express-validator');
const { SuccessModel, ErrorModel } = require("../utils/resModel");
const goodsService = require("../service/GoodsService");
const { pageQuery } = require("../utils/tools")

class GoodsController{
    async createGoods(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(new ErrorModel(errors.array()));
        }
        const result = await goodsService.createGoods(req.body);
        if(typeof result === "string"){
            return res.json(new ErrorModel(result));
        }
        return res.json(new SuccessModel(result, "success"))
    }

    async deleteGoods(req, res){
        let { id } = req.params;
        id = parseInt(id);req.user
        if(Number.isNaN(id)){
            return res.status(403).json(new ErrorModel("the params parameter is incorrect"))
        }
        const result = await goodsService.deleteGoods(id);
        if(typeof result === "string"){
            return res.json(new ErrorModel(result));
        }
        return res.json(new SuccessModel("success"));
    }

    async updateGoods(req, res){
        let { id } = req.params;
        id = parseInt(id);req.user
        if(Number.isNaN(id)){
            return res.status(403).json(new ErrorModel("the params parameter is incorrect"))
        }
        const result = await goodsService.updateGoods(id, req.body);
        if(typeof result === "string"){
            return res.json(new ErrorModel(result))
        }
        return res.json(new SuccessModel("success"))
    }

    async getGoods(req, res){
        const pages = pageQuery(req.query);  /* 处理分页 */
        const result = await goodsService.getGoods(pages);
        if(typeof result === "string"){
            return res.json(new ErrorModel(result))
        }
        return res.json(new SuccessModel(result, "success"));
    }
}

module.exports = new GoodsController();