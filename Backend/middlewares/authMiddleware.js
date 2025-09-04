import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req , res , next) => {
    try {
        const token = req.header("auth-token");

    if(!token){
        return res.set(401).json({error: "Unauthorized"});
    }

    const user = jwt.verify(token, process.env.JWT_SECRET)
    if(!user){
        return res.status(401).json({error: 'Unauthorized'})
    }
    req.user = user;
    next();
    } catch (error) {
        return res.status(401).json({error: 'Unauthorized'})
    }
 
}