import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { makeUserService } from '../user/user.factory';

export const makeAuthService = () => {
    const userService = makeUserService();

    return new AuthService(userService);
}

export const makeAuthController = () => {
    const authService = makeAuthService();

    return new AuthController(authService);
}
