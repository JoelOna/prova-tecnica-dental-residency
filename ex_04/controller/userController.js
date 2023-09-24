/* This code is a module that provides functions related to user authentication and session management
in a JavaScript application. */
const cookie = require('cookie')

const users = [
    { userName: 'user1', password: '123456'},
    { userName: 'user2', password: 'user2'},
    { userName: 'user3', password: '123'},
]

/**
 * The function `isLogged` checks if a user is logged in by parsing the cookies from the request
 * headers and returning true if the cookie value matches the provided name, otherwise it returns
 * false.
 * @param name - The `name` parameter represents the name of the user.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as headers, body, and URL parameters. It is typically provided by the web server
 * or framework handling the request.
 * @param res - The `res` parameter is the response object. It is used to send the response back to the
 * client.
 * @returns a boolean value indicating whether the user is logged in or not.
 */
 const isLogged = (name,req,res) => {
    var cookies = cookie.parse(req.headers.cookie || '');
    if (!cookies) {
       logUser(name,res) 
       isLogged(name,req,res)
    }
    let cookieValue = cookies ? cookies : null

   return cookieValue = name ? true : false
}

/**
 * The logUser function sets a cookie named 'logged' with the provided name and a maximum age of 1
 * week.
 * @param name - The name parameter is the name of the user that you want to log.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is typically provided by the web framework or server that you are using.
 */
const logUser = (name,res)=>{
    res.setHeader('Set-Cookie', cookie.serialize('logged', name, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 // 1 week
      }));
}

/**
 * The function `userValidation` checks if a given name and password match any user in the `users`
 * array.
 * @param name - The `name` parameter represents the username that is being validated.
 * @param password - The `password` parameter is the password entered by the user for validation.
 * @returns The function `userValidation` returns a boolean value. It returns `true` if there is a user
 * in the `users` array with a matching `userName` and `password`, and `false` otherwise.
 */
const userValidation = (name, password) => {
    for (const user of users) {
        if (name === user.userName && password === user.password) {
            return true; 
        }
    }
    return false
}

/**
 * The function "logout" sets the "logged" cookie to null and removes it from the response headers.
 * @param res - The `res` parameter is the response object that is passed to the function. It is used
 * to set the response headers, including the `Set-Cookie` header in this case.
 */
const logout = (res)=>{
    res.setHeader('Set-Cookie', cookie.serialize('logged', null, {
        httpOnly: true,
        maxAge: 0
      }));
}

module.exports = {userValidation,isLogged,logUser,logout}

