// stateless authentication -- jwt

const jwt = require("jsonwebtoken");

const secret = "vipul@123"

// statefull authentication
//const sessionIdToUserMap = new Map();


function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}

    // sessionIdToUserMap.set(id, user);


function getUser(token) {
    // return sessionIdToUserMap.get(id);

    if(!token) return null;

    try {
        return jwt.verify(token, secret)
    } catch (error) {
        return null;
    }
   
}

module.exports = {
    setUser,
    getUser,
}