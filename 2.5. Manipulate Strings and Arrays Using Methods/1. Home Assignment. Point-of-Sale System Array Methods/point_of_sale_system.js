const store_inventory = [
  { item: 'Shampoo', quantity: 1, price_$: 3 },
  { item: 'Soap', quantity: 0, price_$: 2 },
  { item: 'Toothpaste', quantity: 2, price_$: 3 },
]

const new_deliveries = [
  { item: 'Shampoo', quantity: 5, price_$: 4, inventory_index: 0 },
  { item: 'Soap', quantity: 10, price_$: 2, inventory_index: 1 },
  { item: 'Toothpaste', quantity: 10, price_$: 3, inventory_index: 2 },
]

function processDeliveries(items_obj) {
  store_inventory[items_obj.inventory_index].quantity += items_obj.quantity
  store_inventory[items_obj.inventory_index].price_$ = items_obj.price_$
}

new_deliveries.forEach(processDeliveries)

console.log('Delivered items have been added to the inventory.')
console.log('New inventory summary:')
console.log(store_inventory)
