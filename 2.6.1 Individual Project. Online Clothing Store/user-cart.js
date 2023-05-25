module.exports = class UserCart {
  constructor(user) {
    this.user = user;
    this.items = [];
  }

  confirm() {
    console.log(
      `are you sure you want to proceed with this purchase ${this.user.firstName}?`
    );
    return true;
  }

  get totalAmount() {
    return this.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }

  receipt() {
    console.log('receipt:');
    let totalAmount = 0;
    const mappedItems = this.items.map(item => {
      const amount = item.price * item.quantity;
      totalAmount += amount;
      return {
        id: item.id,
        name: item.name,
        category: item.category,
        price: '$' + item.price.toFixed(2),
        quantity: item.quantity,
        amount: '$' + amount.toFixed(2),
      };
    });
    const table = mappedItems.concat([
      {
        id: 'TOTAL',
        name: null,
        category: null,
        price: null,
        quantity: null,
        amount: '$' + totalAmount.toFixed(2),
      },
    ]);
    console.table(table);
  }

  payment(amount) {
    const change = this.totalAmount - amount;
    if (change > 0) throw new Error('the payment is insufficient');
    console.log(
      !change
        ? 'transaction is complete'
        : 'transaction is complete with change: $' + Math.abs(change).toFixed(2)
    );
    return change;
  }

  updateItemStocks(callback) {
    if (!callback instanceof Function) return;
    this.items.forEach(callback);
  }

  clear() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  remove(index) {
    this.splice(index, 1);
  }

  get all() {
    return this.items;
  }
};
