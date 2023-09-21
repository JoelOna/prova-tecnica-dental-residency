const http = require('node:http');
const fs = require("node:fs");
const path = require('node:path');
const querystring = require('node:querystring');
const userValidation = require('./controller/userValidation')


const hostname = '127.0.0.1';
const port = 3000;
 
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    const url = req.url;
    const fileLogin = path.join(__dirname, 'vistas', 'login.html');
    const fileDash = path.join(__dirname, 'vistas', 'dashboard.html');

    if (url === '/login') {
      if (req.method =='GET') {
        const content = fs.readFileSync(fileLogin, 'utf-8');
        res.end(content);
      } else if (req.method == 'POST') {
        let reqInfo = '';
  
        req.on('data', (data) => {
          reqInfo += data.toString();
        });
  
        req.on('end', () => {
          const formData = querystring.parse(reqInfo);
          if (userValidation(formData.user, formData.password)) {
            console.log('todo ok')
            res.writeHead(301, {
              'Location': '/dashboard'
            }).end();
          
          } else if(!userValidation(formData.user, formData.password)) {
            console.log('no entra')
            const content = fs.readFileSync(fileLogin, 'utf-8');
            res.end(content);
          }
        });
      }
    }
    if (url === '/dashboard' ) {
      const content = fs.readFileSync(fileDash, 'utf-8');
      res.end(content);
    } 
    
    else if (url === '/dashboard' && !userValidation(req,res)) {
    
      
      console.log('Path: ',fileDash)
      const content = fs.readFileSync(fileDash, 'utf-8')
     
    
      res.end(content);
    }
   
    
    res.end()
});
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


