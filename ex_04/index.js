const http = require('http');
const fs = require("fs");
const path = require('path');
const querystring = require('querystring');





const userValidation = require('./controller/userValidation')
const hostname = '127.0.0.1';
const port = 3000;


 
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    const url = req.url;
    const filePath = path.join(__dirname, 'vistas', 'login.html');

    if (url === '/login'){
      if(!userValidation(req,res)) {
      const content = fs.readFileSync(filePath, 'utf-8')

      if (req.method == 'POST') {
        let requestBody = ''

        req.on('data', data => {
          requestBody += data.toString();
        });

        req.on('end', () => {
          const formData = querystring.parse(requestBody);
          
          userValidation({userName: formData.user,password: formData.password},res)
          // Ahora puedes acceder a los datos del formulario en el objeto formData
          console.log('Usuario:', formData.user);
          console.log('Contraseña:', formData.password);
    
          // Enviar una respuesta al cliente
      
          res.end('Datos del formulario recibidos.');
        });
      }
      res.end(content);
    }
  }

    if (url === '/dashboard' && !userValidation(req,res)) {
    
      
      console.log('Path: ',filePath)
      const content = fs.readFileSync(filePath, 'utf8')
     
    
      res.end(content);
    }
   
    if (url === '/dashboard' && userValidation(req,res)) {
        res.write('Bienvenido')
        // res.writeHead(302, {
        //     'Location': ` http://${hostname}:${port}/login` // URL a la que deseas redirigir
        //   });
          res.end();
    }
    res.end()
});
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


