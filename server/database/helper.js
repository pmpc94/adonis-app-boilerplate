const User = use('App/Models/User');
const Order = use('App/Models/Order');
const Product = use('App/Models/Product');

function generateRandomNumber(array) {
  return Math.floor(Math.random() * array.rows.length) + 1; //+1 because because user_id must be greater than 0
}

function getRandomElement(array) {
  var randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
}

async function getRandomCustomerId() {
    var customers = await User.query().where('role', 'customer').fetch();
    return generateRandomNumber(customers);
}

async function getRandomVendorId() {
    var vendors = await User.query().where('role', 'vendor').fetch();
    return generateRandomNumber(vendors);
}

async function getRandomOrderId() {
    var orders = await Order.query().select().fetch();
    return generateRandomNumber(orders);
}

async function getRandomProductId() {
    var products = await Product.query().select().fetch();
    return generateRandomNumber(products);
}

async function updateOrderTotalPrice(orderId, quantity, price) {
    var orderObject = await Order.query().where('id', orderId).fetch();
    var total_price = orderObject.rows[0].total_price;
    total_price = total_price + price;
    await Order.query().where('id', orderId).merge({ total_price });
    return price * quantity;
}

async function getProductPrice(product_id) {
  var productPrice = await Product.query().where('id', product_id).fetch();
  return productPrice.rows[0].price;
}

module.exports = {
  generateRandomNumber,
  getRandomElement,
  getRandomCustomerId,
  getRandomVendorId,
  getRandomOrderId,
  getRandomProductId,
  updateOrderTotalPrice,
  getProductPrice
}
