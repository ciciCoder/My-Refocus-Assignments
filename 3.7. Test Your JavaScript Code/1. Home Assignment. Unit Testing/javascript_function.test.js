const { add, divide, multiply, subtract } = require('./javascript_function');

test('Check if add function is working', () => expect(add(70, 170)).toBe(240));
test('Check if subtract function is working', () =>
  expect(subtract(170, 70)).toBe(100));
test('Check if multiply function is working', () =>
  expect(multiply(2, 3)).toBe(6));
test('Check if divide function is working', () => expect(divide(4, 2)).toBe(2));
