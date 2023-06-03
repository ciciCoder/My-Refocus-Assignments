// @ts-check
const http = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;

/**
 * Description
 * @param {number} n
 * @returns {Array<number>}
 */
function fibonacci(n) {
  const fibSeq = [0, 1]; // Initialize the sequence with the first two numbers

  for (let i = 2; i < n; i++) {
    const nextNum = fibSeq[i - 1] + fibSeq[i - 2]; // Calculate the next Fibonacci number
    fibSeq.push(nextNum); // Add the next number to the sequence
  }

  return fibSeq;
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  const fib = fibonacci(10).join(',');
  res.end(`Fibonacci Sequence: ${fib}\nKlein-Hans`);
});

server.listen(port, hostname, () => {
  console.log(`Server runnung at http://${hostname}:${port}/`);
});
