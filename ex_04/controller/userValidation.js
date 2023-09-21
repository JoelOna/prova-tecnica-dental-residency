const users = [
    { userName: 'user1', password: '123456', logged: false },
    { userName: 'user2', password: 'user2', logged: false },
    { userName: 'user3', password: '123', logged: false },
]

const userValidation = (name, password) => {
    for (const user of users) {
        if (name === user.userName && password === user.password) {
            return true; 
        }
    }
    return false
}


module.exports = userValidation

