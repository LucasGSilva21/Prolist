import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

interface IUserInfoRequest extends Request {
    user: {
        id: string;
    }
}

export function ensureAuthenticated(
  request: IUserInfoRequest,
  response: Response,
  next: NextFunction
) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(' ');

    try {
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as IPayload;

        request.user = { id: sub };

        return next();
    } catch (err) {
        return response.status(401).end();
    }
}
