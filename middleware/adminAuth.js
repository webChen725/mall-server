const { ErrorModel } = require("../utils/resModel");

async function adminAuth(req, res, next){
   if(req?.user.auth !== 1){
       return res.status(403).json(new ErrorModel("no admin auth"));
   }
   await next();
}

module.exports = adminAuth;