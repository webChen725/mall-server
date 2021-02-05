const{ Cart, User, Goods } = require("../db/model");

class CartService {
    async addCart(body){
        const { userId, goodsId } = body;
        try{
            /* 校验用户ID是否存在 */
            const user = await User.findOne({
                where: {id: userId}
            });
            if(!user){
                return "用户ID有误";
            }
            /* 校验产品ID是否存在 */
            const product = await Goods.findOne({
                where: {id: goodsId}
            });
            if(!product){
                return "商品ID有误";
            }
            const res = await Cart.create(body);
            return res?.dataValues;
        }catch(err){
            return err.message;
        }
    }
    
    /**
     * 查询用户购物车Service
     */
    async getCart(userId){
        try{
            let result = await User.findOne({
                where: {id: userId},
                attributes: [],
                include: [{
                    model: Cart,
                    where: {
                        'userId': userId 
                    },
                    include: [{
                        model: Goods
                    }]
                }]
            })
            return result;
        }catch(error){
            return error.message;
        }
    }
}

module.exports = new CartService();