const User = use('App/Models/User');
const Order = use('App/Models/Order');
const Product = use('App/Models/Product');

const roleArray = ['customer', 'vendor'];
const categoryArray = ['terrestrial', 'giant', 'dwarf'];
const statusArray = ['created', 'paid', 'canceled'];

function getRandomElement(array) {
  const randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
}

async function getRandomUser(role) {
    const user = await User.query().select('id', 'email').where('role', role).orderByRaw('RAND()').limit(1).fetch();
    return user.rows[0];
}

async function getRandomOrderId() {
    const order = await Order.query().select('id').orderByRaw('RAND()').limit(1).fetch();
    return order.rows[0].id;
}

async function getRandomProduct(orderId, quantity) {
    const product = await Product.query().select('*').orderByRaw('RAND()').limit(1).fetch();
    const order = await Order.query().where('id', orderId).select('total_price').fetch();
    let total_price = order.rows[0].total_price;
    total_price += quantity * product.rows[0].price;
    await Order.query().where('id', orderId).update({ total_price });
    return product;
}

module.exports = {
  roleArray,
  categoryArray,
  statusArray,
  getRandomElement,
  getRandomUser,
  getRandomOrderId,
  getRandomProduct
}
