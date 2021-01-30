const jwt = require("jsonwebtoken");
const { JWTSecret } = require("../config/constants")

function jwtSign(payload){
    return jwt.sign(payload, JWTSecret, {expiresIn: "24h"})
}

async function jwtVerify(token){
    try{
        let payload = await jwt.verify(token, JWTSecret);
        return payload;
    }catch(e){
        return false;
    }
}

module.exports = {
    jwtSign,
    jwtVerify
}