let MYSQL_CONF = {
    host: "127.0.0.1",
    user: "root",
    password: "13544425754",
    port: 3306,
    database: "malldata",
    pool: {
        max: 5,
        min: 0,
        idel: 10000
    }
}

module.exports = {
    MYSQL_CONF
}