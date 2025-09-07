import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UnauthorizedExecption } from "../exceptions/unauthorized.js";
import { ErrorCodes } from "../exceptions/root.js";
dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("auth-token");

        if (!token) {
            return next(new UnauthorizedExecption("Unauthorized", ErrorCodes.UNAUTHORIZED))
        }

        const user = jwt.verify(token, process.env.JWT_SECRET)
        if (!user) {
            return next(new UnauthorizedExecption("Unauthorized", ErrorCodes.UNAUTHORIZED))
        }
        req.user = user;
        next();
    } catch (error) {
        return next(new UnauthorizedExecption("Unauthorized", ErrorCodes.UNAUTHORIZED))
    }

}