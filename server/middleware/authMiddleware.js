const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1]

    if (!token){
        return res.status(401).json({message: "No token, not authorized"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // decoded structure {
   // id: "64abc123...", // the user's MongoDB _id
   // iat: 1234567890,  // issued at (timestamp)
   // exp: 1234567890}   // expiry (timestamp)

        next()
    } catch(error) {
        return res.status(400).json({message: "Invalid token"})
    }

}

module.exports = { protect }