const Sequelize = require("sequelize")
const seq = require("../sequelize")

const Goods = seq.define("goods", {
    productName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productPrice: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: true
    },
    productCover: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    desc: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sub_title: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    productNum: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    productDetail: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
}, {
    timestamps: true
})

module.exports = Goods