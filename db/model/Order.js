const Sequelize = require("sequelize")
const seq = require("../sequelize")

const Order = seq.define("order", {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    productNum: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    addrId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    isPay: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0 /* 0为未支付,1为已支付 */
    },
    isFinish: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, /* 0为未完成,1为已完成 */
    }
}, {
    timestamps: true
})

module.exports = Order