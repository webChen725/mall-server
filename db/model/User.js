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
        type: Sequelize.STRING(32),
        allowNull: false,
    }
}, {
    timestamps: true
})

module.exports = User