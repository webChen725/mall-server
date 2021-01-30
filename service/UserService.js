const{ User } = require("../db/model");
const { Op } = require("sequelize");
const { pwdToMd5 } = require("../utils/tools");

class UserService {
    /**
     * 注册用户
     * @param {*} body 注册用户所需要的数据对象
     */
    async register(body){
        const exist = await this.alreadyExist(body.userName, body.email);
        if(!exist){
            try{
                body.userPwd = pwdToMd5(body.userPwd); /* 密码加密入库 */
                const result = await User.create(body);
                return result.dataValues;
            }catch(e){
                return e.message;
            }
        }else{
            return "用户名或邮箱号已被注册。";
        }
    }
    /**
     * 检查用户名和邮箱是否已经被注册
     */
    async alreadyExist(userName, email){
        const result = await User.findOne({
            where: {
                [Op.or]: {
                    userName,
                    email
                }
            }
        })
        return !!result;
    }
}

module.exports = new UserService();