import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

export const authFactory = () => {
    const userRepository = getCustomRepository(UserRepository);

    const userService = new UserService(userRepository);

    const authService = new AuthService(userService);

    const authController = new AuthController(authService);

    return authController;
}
