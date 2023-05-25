const sampleData = [
  { firstName: 'Angelina', surname: 'Jolie', age: 47, birthday: '4.06.1975' },
  { firstName: 'Brad', surname: 'Pitt', age: 57, birthday: '12.18.1963' },
  { firstName: 'Jennifer', surname: 'Aniston', age: 52, birthday: '2.11.1969' },
  {
    firstName: 'Leonardo',
    surname: 'DiCaprio',
    age: 47,
    birthday: '11.11.1974',
  },
  { firstName: 'Emma', surname: 'Stone', age: 32, birthday: '11.06.1988' },
];

module.exports = class User {
  constructor() {
    this.users = new Map();
    this.autoIncrement = 0;
    this.loginEventLisnteners = [];
    this.addSampleData();
  }

  addSampleData() {
    sampleData.forEach(data => this.add(data));
  }

  get userId() {
    return ++this.autoIncrement;
  }

  add({ firstName, surname, age, birthday }) {
    const id = this.userId;
    this.users.set(id, { id, firstName, surname, age, birthday });
  }

  get(userId) {
    return this.users.get(userId);
  }

  addLoginEventListener(callback) {
    const currentIndex = this.loginEventLisnteners.length;
    this.loginEventLisnteners.push(callback);
    return currentIndex;
  }

  closeLoginEventListener(index) {
    this.loginEventLisnteners.splice(index, 1);
  }

  clearLoginEventLisnters() {
    this.loginEventLisnteners = [];
  }

  login(userId, callback) {
    const user = this.get(userId);
    if (!user) return;
    console.log(`user ${user.firstName} has logged in`);
    if (callback instanceof Function) callback(user);
    this.loginEventLisnteners.forEach(event => event());
    return user;
  }

  remove(userId) {
    this.users.delete(userId);
  }

  get all() {
    return Array.from(this.users.values());
  }
};
