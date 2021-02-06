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
    
    async orderPay(id, userId){
        try{
            /* 校验订单是否属于该用户 */
            const belongOrder = await Order.findOne({
                where: {id, userId}
            })
            if(!belongOrder){
                return "No permission to act on this order";
            }
            if(belongOrder.dataValues.isPay !== 0){
                return "The order has been paid, please do not repeat the operation"
            }
            const result = await Order.update({isPay: 1}, {
                where: {id}
            })
            return result;
        }catch(err){
            return err.message;
        }
    }

    async getAllOrder(userId){
        try{
            const result = await User.findOne({
                where: {id: userId},
                attributes: [],
                include: [{
                    model: Order,
                    where: {
                        'userId': userId
                    },
                    include: [{
                        model: Goods
                    },{
                        model: Address
                    }]
                }]
            })
            return result;
        }catch(err){
            return err.message;
        }
    }
}

module.exports = new OrderService();