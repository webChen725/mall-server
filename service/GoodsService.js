const{ Goods } = require("../db/model");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class GoodsService {
    async createGoods(body){
        try{
            const res = await Goods.create(body);
            return res?.dataValues;
        }catch(err){
            return err.message;
        }
    }
    
    async deleteGoods(id){
        try{
            const res = await Goods.destroy({
                where: {id}
            })
            return res;
        }catch(err){
            return err.message;
        }
    }

    async updateGoods(id, body){
        try{
            const res = await Goods.update(body, {
                where: {id}
            })
            return res;
        }catch(err){
            return err.message;
        }
    }

    async getGoods(pages){
        const {offset, limit} = pages;
        try{
            const result = await Goods.findAndCountAll({
                offset,
                limit,
                order: [
                    ["createdAt", "desc"]
                ]
            })
            return result;
        }catch(err){
            return err.message;
        }
    }

    async searchGoods(keyword, pages){
        const { offset, limit } = pages;
        try{
            const result = await Goods.findAndCountAll({
                where: {
                    productName: {
                        [Op.like]: "%" + keyword + "%"
                    }
                },
                limit,
                offset,
                order: [
                    ["createdAt", "desc"]
                ]
            })
            return result;
        }catch(err){
            return err.message;
        }
    }
}

module.exports = new GoodsService();