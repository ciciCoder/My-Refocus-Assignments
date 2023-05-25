const Item = require('./item');
const User = require('./user');
const UserCart = require('./user-cart');

const user = new User();
const item = new Item();
const shopInfo = {
  name: 'Zara',
  address: 'Manhattan Avenue, New York',
  code: 'NY656',
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

(function () {
  try {
    // user logs in
    const loggedInUser = user.login(getRandomInt(1, 4));
    if (!loggedInUser) return;
    console.table(shopInfo);
    console.log('user list:');
    console.table(user.all);
    console.log('list of available products:');
    console.table(item.all);
    console.log('items need to restock ');
    console.table(item.itemsToRestock(100));
    const userCart = new UserCart(loggedInUser);
    // user adds first item in cart
    item.all.forEach(stockItem => {
      const item1 = item.get(stockItem.id);
      userCart.add({
        id: item1.id,
        name: item1.name,
        category: item1.category,
        price: item1.price,
        quantity: getRandomInt(1, stockItem.quantity),
      });
    });

    console.log('cart items: ');
    console.table(userCart.all);
    // user confirms the purchase
    const confirm = userCart.confirm();
    if (!confirm) return;
    userCart.receipt();
    userCart.payment(100000);
    userCart.updateItemStocks(cartItem => {
      const stockItem = item.get(cartItem.id);
      item.update(cartItem.id, {
        quantity: stockItem.quantity - cartItem.quantity,
      });
    });
    console.log('updated list of available products:');
    console.table(item.all);
    console.log('items need to restock ');
    console.table(item.itemsToRestock(100));
  } catch (e) {
    console.log(e.message);
  }
})();
