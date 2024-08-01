require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) =>{

    const authorizationToken = req.headers.authorization;
    if(!authorizationToken) {res.status(401).json({message: "Token not found"})}
    const token = authorizationToken.split(' ')[1];;
     if(!token){
        res.status(401).json({message: "Unauthorized"})
     }
     try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = payload;
        next();
     } catch (error) {
        res.status(401).json({message: "Invalid token"})
     }
}

const generateJwtAuthToken = (userData) =>{
    return jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
}

module.exports = {jwtAuthMiddleware, generateJwtAuthToken}