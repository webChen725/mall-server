const crypto = require("crypto")

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

 module.exports = {
     pwdToMd5,
     getCode
 }