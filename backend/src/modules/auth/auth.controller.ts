import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

class AuthController {
    constructor(private authService: AuthService) {}

    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, password } = request.body;

            const result = await this.authService.login({ email, password });

            return response.status(200).json(result);
        } catch (err) {
            return next(err);
        }
    }

    async forgotPassword(request: Request, response: Response, next: NextFunction) {
        try {
            const { email } = request.body;

            await this.authService.forgotPassword(email);

            return response.status(204).send();
        } catch (err) {
            return next(err);
        }
    }

    async resetPassword(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, token, newPassword } = request.body;

            await this.authService.resetPassword({ email, token, newPassword });

            return response.status(204).send();
        } catch (err) {
            return next(err);
        }
    }
}

export { AuthController };
