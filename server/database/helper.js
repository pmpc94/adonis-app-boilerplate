const User = use('App/Models/User');
const Order = use('App/Models/Order');
const OrderProduct = use('App/Models/OrderProduct');
const Product = use('App/Models/Product');
const Database = use('Database')

function getRandomElement(array) {
  var randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
}

async function getRandomCustomerId() {
    var customer = await Database.raw('select id from users where role = "customer" order by rand() limit 1')
    var randomCustomerId = customer[0][0].id;
    return randomCustomerId;
}

async function getRandomVendorId() {
    var vendor = await Database.raw('select id from users where role = "vendor" order by rand() limit 1')
    var randomVendorId = vendor[0][0].id;
    return randomVendorId;
}

async function getRandomOrderId() {
    var order = await Database.raw('select id from orders order by rand() limit 1')
    var orderId = order[0][0].id;
    return orderId;
}

async function getRandomProduct(orderId, quantity) {
    var product = await Database.raw('select * from products order by rand() limit 1');
    var order = await Order.query().where('id', orderId).select('total_price').fetch();
    var total_price = order.rows[0].total_price;
    total_price += quantity * product[0][0].price;
    await Order.query().where('id', orderId).update({ total_price });
    return product;
}

module.exports = {
  getRandomElement,
  getRandomCustomerId,
  getRandomVendorId,
  getRandomOrderId,
  getRandomProduct
}
