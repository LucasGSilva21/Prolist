import { Request, Response } from 'express';
import AuthService from './auth.service';

class AuthController {
    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const result = await AuthService.login({ email, password });

        return response.status(200).json(result);
    }
}

export default new AuthController();
