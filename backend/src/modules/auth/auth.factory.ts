import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { makeUserService } from '../user/user.factory';
import { EmailSender } from '../../common/helpers/mailer';

export const makeAuthService = () => {
    const userService = makeUserService();
    const emailSender = new EmailSender();

    return new AuthService(userService, emailSender);
}

export const makeAuthController = () => {
    const authService = makeAuthService();

    return new AuthController(authService);
}
