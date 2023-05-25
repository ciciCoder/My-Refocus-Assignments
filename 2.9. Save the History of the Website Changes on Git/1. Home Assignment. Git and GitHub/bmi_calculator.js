/**
 * Description
 * @param {number} weight
 * @param {number} height
 * @returns {string}
 */
function calculateBMI(weight, height) {
  const heightInMeters = height / 100 // Convert height from centimeters to meters
  const bmi = weight / (heightInMeters * heightInMeters) // BMI formula
  return bmi.toFixed(2) // Return BMI value rounded to 2 decimal places
}

const weight = 70 // Weight in kilograms
const height = 170 // Height in centimeters

const bmi = calculateBMI(weight, height)
console.log('Your BMI is: ' + bmi)
