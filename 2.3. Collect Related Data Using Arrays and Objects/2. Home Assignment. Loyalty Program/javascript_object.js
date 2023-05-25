let customer = {
  customer_name: 'Johnny Manggo',
  points: 12300,
  cart: [
    { item: 'Shampoo', quantity: 2, price_$: 3 },
    { item: 'Soap', quantity: 2, price_$: 2 },
    { item: 'Toothpaste', quantity: 1, price_$: 3 },
  ],
}
let total_bill = 0

console.log(`Hi, ${customer.customer_name}! We arehappy to see you today`)
console.log(`Your current points are: ${customer.points}.`)

for (let i in customer.cart) {
  const { quantity, item, price_$ } = customer.cart[i]
  const amount = price_$ * quantity
  customer.points += quantity
  console.log(
    `${quantity}x ${item.padEnd(10, ' ')} ---- $ ${amount.toFixed(2)}`
  )
  total_bill += amount
}
console.log(`Total Bill:${' '.padStart(7, ' ')} $ ${total_bill.toFixed(2)}`)
console.log(`New Current Points:  ${customer.points}`)
