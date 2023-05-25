const birth_year = 1999
let current_year = new Date().getFullYear()

let age = current_year - birth_year

console.log(`Patient’s age: ${age}`)

let birth_month = 0
const current_month = new Date().getMonth()
current_year--

age = current_year - birth_year

if (birth_month <= current_month) age++

console.log(`Patient’s Accurate Age: ${age}`)
