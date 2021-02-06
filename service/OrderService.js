const{ Order, User, Goods, Address } = require("../db/model");

class OrderService {
    async createOrder(body){
        const { userId, goodId, addressId } = body;
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
                where: {id: goodId}
            });
            if(!product){
                return "商品ID有误";
            }
            /* 校验收货地址是否存在 */
            const addr = await Address.findOne({
                where: {id: addressId}
            })
            if(!addr){
                return "收货地址有误";
            }
            const res = await Order.create(body);
            return res?.dataValues;
        }catch(err){
            return err.message;
        }
    }
    
}

module.exports = new OrderService();