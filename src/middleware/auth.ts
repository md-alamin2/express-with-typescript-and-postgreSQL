import jwt, { JwtPayload } from 'jsonwebtoken';

// higher order function returns function

import { NextFunction, Request, Response } from "express"
import config from '../config';


const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    message: 'Unauthorized access',
                    success: false
                })
            }
            const decoded = jwt.verify(token, config.jwt_secret as string);
            req.user = decoded as JwtPayload;
            next()
        } catch (err: any) {
            res.status(401).json({
                success: false,
                message: err.message
            })
        }
    }
}


export default auth;