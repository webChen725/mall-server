const crypto = require("crypto")
const LIMIT = 10;
 /**
  * 对密码执行加密操作:
  */
 function pwdToMd5(pwd){
    return crypto.createHash("md5").update(pwd).digest("hex");    
 }

/**
  * 生成随机的6位验证
  */
 function getCode(){
    return  Math.random().toFixed(6).slice(-6);
}

 /**
  * 处理分页相关的数据query
  */
 function pageQuery({limit, offset}){
    limit = ~~limit ? ~~limit : LIMIT;
    offset = ~~offset ? ~~offset : 0;
    return {
        limit,
        offset
    }
 }

 module.exports = {
     pwdToMd5,
     getCode,
     pageQuery
 }