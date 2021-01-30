const Sequelize = require("sequelize")
const seq = require("../sequelize")

const User = seq.define("user", {
    userName: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    userPwd: {
        type: Sequelize.STRING(64),
        allowNull: true
    },
    myPhoto: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    auth: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0  /* 0为普通用户，1为管理员用户 */
    }
}, {
    timestamps: true
})

module.exports = User