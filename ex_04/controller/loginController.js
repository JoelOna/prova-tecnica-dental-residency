const fs = require('node:fs');
const path = require('node:path');
const querystring = require('node:querystring');
const { userValidation, isLogged, logUser, logout } = require('./userController');
const cookie = require('cookie');

/**
 * The `login` function handles the login process, including checking if a user is already logged in,
 * rendering the login page, validating user credentials, logging in the user, redirecting to the
 * dashboard, and logging out the user.
 * @param req - The `req` parameter is the request object, which contains information about the
 * incoming HTTP request, such as the URL, headers, and body.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the `http.ServerResponse` class and provides methods for setting
 * the response headers and body.
 * @returns In the code provided, the function `login` is being exported as part of a module.
 * Therefore, the function itself is being returned as part of the module.exports object.
 */
function login(req, res) {

  const url = req.url;
  const fileLogin = path.join('vistas', 'login.html');
  var user = ''

  var cookies = cookie.parse(req.headers.cookie || '')
  let cookieValue = cookies ? cookies : null
  user = cookieValue.logged


  if (url === '/') {

    if (isLogged(user, req, res)) {
      res.writeHead(302, { 'Location': `/dashboard` });
      return res.end();

    } else if (!isLogged(user, req, res)) {
      res.writeHead(302, { 'Location': `/login` });
      return res.end();
    }
  }

  if (url === '/login') {
    if (isLogged(user, req, res)) {
      res.writeHead(302, { 'Location': '/dashboard' });
      return res.end();
    }
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
          logUser(formData.user, res)
          res.writeHead(302, { 'Location': `/dashboard` });
          return res.end();

        } else {
          const content = fs.readFileSync(fileLogin, 'utf-8');
          return res.end(content);
        }

      });
    }
    user = cookieValue.logged

  }
  if (url === '/dashboard') {
    if (isLogged(user, req, res)) {
      res.statusCode = 200;
      return res.end(`<h1>Bienvenido usuario/a ${user}!</h1>
        <a href="/logout">Log Out</a>`);
    } else if (!isLogged(user, req, res)) {
      res.writeHead(302, { 'Location': '/login' });
      return res.end();
    }


  }
  if (url === '/logout') {
    logout(res)
    res.writeHead(302, { 'Location': `/login` });
    return res.end();

  }

}

module.exports = { login }