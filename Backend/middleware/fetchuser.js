const jwt = require("jsonwebtoken")
const JWT_TOKEN = 'thisisgreat'

const fetchuser = (req, res, next) => {
    // Get the user from the jwt
    const token = req.header("auth-token")
    // const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({
            error: "Please send a valid token"
        })
    }
    try {
        const data = jwt.verify(token, JWT_TOKEN);
        req.user = data.user
        next();
    } catch (error) {
        res.status(401).send({
            error: "Please send a valid token"
        })
    }
}

module.exports = fetchuser;