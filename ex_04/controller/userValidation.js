const users = [
    { userName: 'user1', password: '123456', logged: false },
    { userName: 'user2', password: 'user2', logged: false },
    { userName: 'user3', password: '123', logged: false },
]

const userValidation = (req, res) => {
    console.log(`Usuario: ${req.user} Password ${req.password}`)
    users.forEach(user => {

        if (!user.logged && req.user === user.userName && req.password === user.password) {
            
            user.logged = true
            return true
        }
    });
}


module.exports = userValidation