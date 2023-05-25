function counter() {
  let count = 1
  return `original count: ${count}, new count: ${add(count)}`
}

function add(count) {
  count++
  return count
}

console.log(counter())
