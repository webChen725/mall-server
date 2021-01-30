const crypto = require("crypto")

 /**
  * 对密码执行加密操作:
  */
 function pwdToMd5(pwd){
    return crypto.createHash("md5").update(pwd).digest("hex");    
 }


 module.exports = {
     pwdToMd5
 }