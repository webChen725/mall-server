const{ User } = require("../db/model");
const { Op } = require("sequelize");
const { pwdToMd5, getCode } = require("../utils/tools");
const { sendMail } = require("../utils/mail");
const { redisSet, redisGet, redisDel } = require("../utils/redisHandler");

class UserService {
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
     * 用户登录
     */
    async login(body){
        body.userPwd = pwdToMd5(body.userPwd);
        try{
            const res = await User.findOne({
                where: body
            });
            console.log(res)
            if(res){
                return res.dataValues;
            }else{
                return "用户名或密码错误."
            }
        }catch(e){
            return e.message;
        }
    }
    /**
     * 发送邮箱验证码
     */
    async sendMailCode(body){
        try{
            const exist = await User.findOne({
                where: body
            })
            if(exist){
                const code = getCode(); /* 生成验证码 */
                const subject = "电商密码找回验证码";
                const text = `尊敬的用户${body.email}: 您的邮箱验证码为${code}, 请在60s内完成密码重置操作`;
                const status = await sendMail(body.email, subject, text);
                if(status){
                    redisSet(body.email, code); /* 邮箱验证码写入redis */
                    return true;
                }else{
                    return "发送邮箱验证码失败.";
                }
            }else{
                return "您的邮箱和用户名不相匹配，请检查."
            }
        }catch(e){
            return e.message;
        }
    }
    /**
     * 重置密码
     */
    async resetPassword(body){
        const realCode = await redisGet(body.email);
        if(body.code != realCode){
            return "验证码有误，请检查.";
        }
        try{
            const result = await User.update({userPwd: pwdToMd5(body.userPwd)}, {
                where: {
                    userName: body.userName
                }
            })
            redisDel(body.email)
            return Array.isArray(result) && !!result[0] ? true : "重置密码失败.";
        }catch(e){
            return e.message;
        }
    }
}

module.exports = new UserService();