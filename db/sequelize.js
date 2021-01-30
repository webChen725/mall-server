const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../config/dbConfig')

const { host, user, password, database, pool } = MYSQL_CONF
const conf = {
    host,
    dialect: 'mysql',
    pool
}

// 创建 Sequelize 实例连接数据库
const seq = new Sequelize(database, user, password, conf)

module.exports = seq