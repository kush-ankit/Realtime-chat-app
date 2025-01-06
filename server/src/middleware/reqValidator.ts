import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: string | object;
}

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const tokenValidator = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.token;
        console.log(" token", token)
        if (!token) {
            console.log("no token")
            return res.status(401).json({ status: false, message: "Access denied. No token provided." });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        console.log(decoded)
        console.log("token validated")
        next();
    } catch (error) {
        res.status(400).json({ status: false, message: "Invalid token." });
    }
};
