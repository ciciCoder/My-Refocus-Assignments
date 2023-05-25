const sampleData = [
  { name: 'Blue Jeans', category: 'Trousers', price: 50, quantity: 456 },
  { name: 'Red T-shirt', category: 'Shirts', price: 20, quantity: 234 },
  { name: 'Black Sneakers', category: 'Shoes', price: 80, quantity: 123 },
  { name: 'Green Jacket', category: 'Jackets', price: 100, quantity: 321 },
];

module.exports = class Item {
  constructor() {
    this.autoIncrement = 0;
    this.items = new Map();
    this.addSampleData();
  }

  addSampleData() {
    sampleData.forEach(item => this.add(item));
  }

  get itemId() {
    return ++this.autoIncrement;
  }

  itemsToRestock(lowerLimit) {
    const result = [];
    this.items.forEach(item => {
      if (item.quantity > lowerLimit) return;
      result.push(item);
    });
    return result;
  }

  add({ name, category, price, quantity }) {
    const { itemId } = this;
    this.items.set(itemId, { id: itemId, name, category, price, quantity });
  }

  update(itemId, { name, category, price, quantity }) {
    const item = this.get(itemId);
    if (!item) throw new Error('no item found');
    const data = { name, category, price, quantity };
    const keys = Object.keys(data);
    const updateData = keys.reduce((result, key) => {
      if (data[key] !== undefined) result[key] = data[key];
      return result;
    }, {});
    this.items.set(itemId, { ...item, ...updateData });
  }

  get(itemId) {
    return this.items.get(itemId);
  }

  remove(itemId) {
    this.items.delete(itemId);
  }

  get all() {
    return Array.from(this.items.values());
  }
};
