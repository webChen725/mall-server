const Sequelize = require("sequelize")
const seq = require("../sequelize")

const Address = seq.define("address", {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userName: {
        type: Sequelize.STRING(64),
        allowNull: true
    },
    addr: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    postCode: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "000000"
    },
    tel: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    isDefault: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0  /* 0为非默认地址，1为默认地址 */
    }
}, {
    timestamps: true
})

module.exports = Address