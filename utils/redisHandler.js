const redisPool = require("redis-connection-pool")('redisPool', {
    host: '127.0.0.1',
    port: 6379,
    max_client: 30,
    perform_checks: false,
    database: 0,
});

/**
 * redis数据库入库处理函数封装
 */
function redisSet(key, value){
    return new Promise((resolve) => {
        redisPool.set(key, value, function(err){
            if(err) {
                resolve(false);
                return;
            }
            redisPool.expire(key, 60); // 设置过期时间
            resolve(true)
        })
    })
}

/**
 * redis数据库取值处理
 */
function redisGet(key){
    return new Promise(resolve => {
        redisPool.get(key, function(err, reply){
            if(err) {
                resolve(false);
                return;
            }
            resolve(reply)
        })
    })
}

/**
 * redis数据库数据删除
 */
function redisDel(key){
    return new Promise(resolve => {
        redisPool.del(key, function(err){
            if(err){
                resolve(false);
                return;
            }
            resolve(true)
        })
    })
}

module.exports = {
    redisSet,
    redisGet,
    redisDel
}