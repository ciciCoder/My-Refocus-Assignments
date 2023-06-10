let obj = {
  num1: 100,
  num2: 50,
  sum: 150,
  difference: 50,
  product: 500,
  quotient: 20,
};

/**
 * Description
 * @param {number} num1
 * @param {number} num2
 * @returns {number}
 */
const add = (num1, num2) => num1 + num2;
/**
 * Description
 * @param {number} num1
 * @param {number} num2
 * @returns {number}
 */
const subtract = (num1, num2) => num1 - num2;
/**
 * Description
 * @param {number} num1
 * @param {number} num2
 * @returns {number}
 */
const multiply = (num1, num2) => num1 * num2;
/**
 * Description
 * @param {number} num1
 * @param {number} num2
 * @returns {number}
 */
const divide = (num1, num2) => num1 / num2;

function showData(obj) {
  console.log('===========================');
  console.log(`First Number: ${obj.num1}`);
  console.log(`Second Number: ${obj.num2}`);
  console.log(`The sum is: ${obj.sum}`);
  console.log(`The difference is: ${obj.difference}`);
  console.log(`The product is: ${obj.product}`);
  console.log(`The quotient is: ${obj.quotient}`);
}

function newSetOfNumbers(num1, num2) {
  obj.num1 = num1;
  obj.num2 = num2;
  obj.sum = add(num1, num2);
  obj.difference = subtract(num1, num2);
  obj.product = multiply(num1, num2);
  obj.quotient = divide(num1, num2);
}

showData(obj);
newSetOfNumbers(200, 10);
showData(obj);
newSetOfNumbers(500, 20);
showData(obj);

module.exports = { add, subtract, multiply, divide };
