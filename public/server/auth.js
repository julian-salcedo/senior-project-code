const userList = require("./public/users.json")

const auth = (username, password) => {
    const user = userList.find((profile)=>{
        return profile.username == username
    })

    if (user == undefined) {
        return {success: false, reason: "Username Invalid"}
    }
    
    if (user.password == password) {
        return {success: true, data: user}
    }
    else{
        return {success: false, reason: "Password Invalid"}
    }
}

module.exports = auth