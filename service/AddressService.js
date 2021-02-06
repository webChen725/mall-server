const{ Address, User } = require("../db/model");

class AddressService {
    async create(body){
        const { userId } = body;
        try{
            /* 校验用户ID是否存在 */
            const user = await User.findOne({
                where: {id: userId}
            });
            if(!user){
                return "用户ID有误";
            }
            const res = await Address.create(body);
            return res?.dataValues;
        }catch(err){
            return err.message;
        }
    }

    async updateAddr(body, id, userId){
        const { isDefault } = body;
        try{
            /* 当设置收货地址为默认时，需要先切换之前的默认地址，保证始终只有一个默认 */
            if(isDefault){
                await Address.update({isDefault: 0}, {
                    where: {
                        userId,
                        isDefault: 1
                    }
                })
            }
            const res = await Address.update(body, {
                where: {id}
            })
            return res;
        }catch(err){
            return err.message;
        }
    }
}

module.exports = new AddressService();