const http = require('node:http');
 
const hostname = '127.0.0.1';
const port = 3000;
 
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html ; charset=utf-8');
    const url = req.url;
    url === '/' ? res.write('<h1>¡Hola, mundo!</h1>') :  res.write('<h1>Página no encontrada</h1>') 
    res.end()
});
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});