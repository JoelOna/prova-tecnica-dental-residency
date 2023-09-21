const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const querystring = require('node:querystring');
const userValidation = require('./controller/userValidation');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;
  const fileLogin = path.join(__dirname, 'vistas', 'login.html');
  const fileDash = path.join(__dirname, 'vistas', 'dashboard.html');
  let user = ''
  let password = ''

  if (url === '/login') {
    if (req.method === 'GET') {
      const content = fs.readFileSync(fileLogin, 'utf-8');
      res.end(content);
    } else if (req.method === 'POST') {
      let reqInfo = '';

      req.on('data', (data) => {
        reqInfo += data.toString();
      });

      req.on('end', () => {
        const formData = querystring.parse(reqInfo);

        if (userValidation(formData.user, formData.password)) {
          user = formData.user
          password = formData.password
          res.writeHead(302, { 'Location': `/dashboard` });
          return res.end();
        } else {
          const content = fs.readFileSync(fileLogin, 'utf-8');
          res.end(content);
        }
      });
    }
  } else if (url === '/dashboard' && userValidation(user,password)) {
    res.statusCode = 200;
    const contentDashboard = fs.readFileSync(fileDash, 'utf-8');
    res.end(contentDashboard);
  } 
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


