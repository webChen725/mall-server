const Sequelize = require("sequelize")
const seq = require("../sequelize")

const Cart = seq.define("cart", {
    productNum: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true
})

module.exports = Cart