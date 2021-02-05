const{ Cart, User, Goods } = require("../db/model");

class CartService {
    async addCart(body){
        const { userId, productId } = body;
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
                where: {id: productId}
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
    async getCart(userId, pages){
        const { offset, limit } = pages;  // 处理分页数据
        try{
            const res = await Cart.findAll({
                where: {
                    id: userId
                },
                include: [{
                    model: User,
                    include: ["users"]
                }],
                offset,
                limit
            });
            console.log(res)
            return res;
        }catch(error){
            return error.message;
        }
    }
}

module.exports = new CartService();