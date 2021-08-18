import { Request, Response } from 'express';
import { AuthService } from './auth.service';

class AuthController {
    constructor(private authService: AuthService) {}

    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const result = await this.authService.login({ email, password });

        return response.status(200).json(result);
    }
}

export { AuthController };
