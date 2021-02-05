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
}

module.exports = new AddressService();