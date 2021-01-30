const User = require("./User");
const Cart = require("./Cart");
const Address = require("./Address");
const Order = require("./Order");
const Goods = require("./Goods")

/* 用户和购物车列表项直接一对多关系 */
User.hasMany(Cart);
Cart.belongsTo(User);

/* 用户和订单之间一对多关系 */
User.hasMany(Order);
Order.belongsTo(User);

/* 用户和地址之间一对多关系 */
User.hasMany(Address);
Address.belongsTo(User);

/* 商品和订单之间一对多关系 */
Goods.hasMany(Order);
Order.belongsTo(Goods);

/* 收货地址和订单之间一对多关系 */
Address.hasMany(Order);
Order.belongsTo(Address);


module.exports = {
    User,
    Cart
}