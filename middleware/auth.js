const { jwtVerify } = require("../utils/jwtHandler");
const { ErrorModel } = require("../utils/resModel");

async function auth(req, res, next){
    let token = req.headers.authorization;
    if(typeof token === "string"){
        token = token.split(" ")[1];
        let payload = await jwtVerify(token);
        if(payload){
            req.user = payload;
            await next();
        }else{
            return res.status(403).json(new ErrorModel("User permission authorization failed."));
        }
    }else{
        return res.status(403).json(new ErrorModel("User permission authorization failed."));
    }
}

module.exports = auth;