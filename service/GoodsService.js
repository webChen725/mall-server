const{ Goods } = require("../db/model");

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
}

module.exports = new GoodsService();