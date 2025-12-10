import jwt, { JwtPayload } from 'jsonwebtoken';

// higher order function returns function

import { NextFunction, Request, Response } from "express"
import config from '../config';


const auth = (...role: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    message: 'Unauthorized access',
                    success: false
                })
            }
            const decoded = jwt.verify(token, config.jwt_secret as string)as JwtPayload;
            console.log(decoded)
            req.user = decoded;

            if(role.length && !role.includes(decoded.role)){
                return res.status(403 ).json({
                    success: false,
                    message: "forbidden access"
                })
            }
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