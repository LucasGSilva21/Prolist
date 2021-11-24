import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    email: string,
    role: string,
    iat: number,
    exp: number,
    sub: string
}

interface IUserInfoRequest extends Request {
    user: {
        id: string;
        role: string;
    }
}

export function ensureAuthenticated(
  request: IUserInfoRequest,
  response: Response,
  next: NextFunction
) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            message: 'Token is missing'
        });
    }

    const [, token] = authToken.split(' ');

    try {
        const { sub, role } = verify(
            token,
            process.env.JWT_SECRET
        ) as IPayload;

        request.user = { 
            id: sub,
            role: role
        };

        return next();
    } catch (err) {
        return response.status(401).json({
            message: 'Token invalid'
        });
    }
}
