const Sequelize = require("sequelize")
const seq = require("../sequelize")

const Cart = seq.define("cart", {
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
    }
}, {
    timestamps: true
})

module.exports = Cart